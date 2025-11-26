package com.xhhao.commentinteract.service.impl;


import com.google.common.hash.Hashing;
import com.xhhao.commentinteract.model.CommentWithReplyVo;
import com.xhhao.commentinteract.model.CommentsVo;
import com.xhhao.commentinteract.model.OwnerInfo;
import com.xhhao.commentinteract.model.ReplyVo;
import com.xhhao.commentinteract.service.CommentPublicQueryService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.lang.Nullable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import run.halo.app.core.extension.User;
import run.halo.app.core.extension.content.Comment;
import run.halo.app.core.extension.content.Reply;
import run.halo.app.core.user.service.UserService;
import run.halo.app.extension.*;
import run.halo.app.infra.AnonymousUserConst;
import java.util.HashMap;
import java.util.Optional;
import java.util.function.Function;

import static java.nio.charset.StandardCharsets.UTF_8;
import static org.apache.commons.lang3.ObjectUtils.defaultIfNull;
import static run.halo.app.core.extension.content.Comment.CommentOwner.ownerIdentity;
import static run.halo.app.extension.index.query.QueryFactory.and;
import static run.halo.app.extension.index.query.QueryFactory.equal;
import static run.halo.app.extension.index.query.QueryFactory.isNull;
import static run.halo.app.extension.index.query.QueryFactory.or;

/**
 * comment public query service implementation.
 *
 * @author LIlGG
 * @author guqing
 */
@Component
@RequiredArgsConstructor
public class CommentPublicQueryServiceImpl implements CommentPublicQueryService {
    private final ReactiveExtensionClient client;
    private final UserService userService;
    @Override
    public Mono<ListResult<CommentsVo>> list(Ref ref, PageRequest pageParam) {
        var pageRequest = Optional.ofNullable(pageParam)
            .map(page -> page.withSort(page.getSort().and(defaultCommentSort())))
            .orElseGet(() -> PageRequestImpl.ofSize(10));
        return populateCommentListOptions(ref)
            .flatMap(listOptions -> client.listBy(Comment.class, listOptions, pageRequest))
            .flatMap(listResult -> Flux.fromStream(listResult.get())
                .map(this::toCommentVo)
                .flatMapSequential(Function.identity())
                .collectList()
                .map(commentVos -> new ListResult<>(listResult.getPage(),
                    listResult.getSize(),
                    listResult.getTotal(),
                    commentVos)
                )
            )
            .defaultIfEmpty(ListResult.emptyResult());
    }

    @Override
    public Mono<ListResult<CommentWithReplyVo>> convertToWithReplyVo(
        ListResult<CommentsVo> comments, int replySize) {
        return Flux.fromIterable(comments.getItems())
            .flatMapSequential(commentVo -> {
                var commentName = commentVo.getMetadata().getName();
                return listReply(commentName, 1, replySize)
                    .map(replyList -> CommentWithReplyVo.from(commentVo)
                        .setReplies(replyList)
                    );
            })
            .collectList()
            .map(result -> new ListResult<>(
                comments.getPage(),
                comments.getSize(),
                comments.getTotal(),
                result)
            );
    }
    public Mono<ListResult<ReplyVo>> listReply(String commentName, Integer page, Integer size) {
        return listReply(commentName, PageRequestImpl.of(pageNullSafe(page), sizeNullSafe(size),
            defaultReplySort()));
    }
    public Mono<ListResult<ReplyVo>> listReply(String commentName, PageRequest pageParam) {
        // check comment
        return client.get(Comment.class, commentName)
            .flatMap(this::populateReplyListOptions)
            .flatMap(listOptions -> {
                var pageRequest = Optional.ofNullable(pageParam)
                    .map(page -> page.withSort(page.getSort().and(defaultReplySort())))
                    .orElse(PageRequestImpl.ofSize(0));
                return client.listBy(Reply.class, listOptions, pageRequest)
                    .flatMap(list -> Flux.fromStream(list.get().map(this::toReplyVo))
                        .flatMapSequential(Function.identity())
                        .collectList()
                        .map(replyVos -> new ListResult<>(list.getPage(), list.getSize(),
                            list.getTotal(),
                            replyVos))
                    );
            })
            .defaultIfEmpty(ListResult.emptyResult());
    }
    Mono<CommentsVo> toCommentVo(Comment comment) {
        Comment.CommentOwner owner = comment.getSpec().getOwner();
        return Mono.just(CommentsVo.from(comment))
            .flatMap(commentVo -> getOwnerInfo(owner)
                .doOnNext(commentVo::setOwner)
                .thenReturn(commentVo)
            )
            .flatMap(this::filterCommentSensitiveData);
    }

    Mono<ReplyVo> toReplyVo(Reply reply) {
        Comment.CommentOwner owner = reply.getSpec().getOwner();
        return Mono.just(ReplyVo.from(reply))
            .flatMap(replyVo -> getOwnerInfo(owner)
                .doOnNext(replyVo::setOwner)
                .thenReturn(replyVo)
            )
            .flatMap(this::filterReplySensitiveData);
    }

    private Mono<? extends ReplyVo> filterReplySensitiveData(ReplyVo replyVo) {
        var owner = replyVo.getOwner();
        replyVo.setOwner(OwnerInfo
            .builder()
            .displayName(owner.getDisplayName())
            .avatar(owner.getAvatar())
            .name(owner.getName())
            .email(owner.getName())
            .kind(owner.getKind())
            .build());

        replyVo.getSpec().setIpAddress("");
        var specOwner = replyVo.getSpec().getOwner();
        specOwner.setName("");
        var email = owner.getEmail();
        if (StringUtils.isNotBlank(email)) {
            var emailHash = Hashing.sha256()
                .hashString(email.toLowerCase(), UTF_8)
                .toString();
            if (specOwner.getAnnotations() == null) {
                specOwner.setAnnotations(new HashMap<>(2));
            }
            specOwner.getAnnotations()
                .put(Comment.CommentOwner.EMAIL_HASH_ANNO, emailHash);
        }
        if (specOwner.getAnnotations() != null) {
            specOwner.getAnnotations().remove("Email");
        }
        return Mono.just(replyVo);
    }
    private Mono<ListOptions> populateReplyListOptions(Comment comment) {
        // The comment name must be equal to the comment name of the reply
        // is approved and not hidden
        return populateVisibleListOptions(comment)
            .doOnNext(builder ->
                builder.andQuery(equal("spec.commentName", comment.getMetadata().getName()))
            )
            .map(ListOptions.ListOptionsBuilder::build);
    }
    private Mono<? extends CommentsVo> filterCommentSensitiveData(CommentsVo commentVo) {
        var owner = commentVo.getOwner();
        commentVo.setOwner(OwnerInfo
            .builder()
            .displayName(owner.getDisplayName())
            .avatar(owner.getAvatar())
            .name(owner.getName())
            .email(owner.getName())
            .kind(owner.getKind())
            .build());

        commentVo.getSpec().setIpAddress("");
        var specOwner = commentVo.getSpec().getOwner();
        specOwner.setName("");
        var email = owner.getEmail();
        if (StringUtils.isNotBlank(email)) {
            var emailHash = Hashing.sha256()
                .hashString(email.toLowerCase(), UTF_8)
                .toString();
            if (specOwner.getAnnotations() == null) {
                specOwner.setAnnotations(new HashMap<>(2));
            }
            specOwner.getAnnotations()
                .put(Comment.CommentOwner.EMAIL_HASH_ANNO, emailHash);
        }
        if (specOwner.getAnnotations() != null) {
            specOwner.getAnnotations().remove("Email");
        }
        return Mono.just(commentVo);
    }



    private Mono<OwnerInfo> getOwnerInfo(Comment.CommentOwner owner) {
        if (Comment.CommentOwner.KIND_EMAIL.equals(owner.getKind())) {
            return Mono.just(OwnerInfo.from(owner));
        }
        return userService.getUserOrGhost(owner.getName())
            .map(OwnerInfo::from);
    }

    private Mono<ListOptions> populateCommentListOptions(@Nullable Ref ref) {
        return populateVisibleListOptions(null)
            .doOnNext(builder -> {
                if (ref != null) {
                    builder.andQuery(
                        equal("spec.subjectRef", Comment.toSubjectRefKey(ref)));
                }
            })
            .map(ListOptions.ListOptionsBuilder::build);
    }

    private Mono<ListOptions.ListOptionsBuilder> populateVisibleListOptions(@Nullable Comment comment) {
        return ReactiveSecurityContextHolder.getContext()
            .map(SecurityContext::getAuthentication)
            .map(Authentication::getName)
            .defaultIfEmpty(AnonymousUserConst.PRINCIPAL)
            .flatMap(username -> {
                var commentHidden = false;
                var isCommentOwner = false;
                if (comment != null) {
                    commentHidden = Boolean.TRUE.equals(comment.getSpec().getHidden());
                    var owner = comment.getSpec().getOwner();
                    isCommentOwner = owner != null && java.util.Objects.equals(
                        ownerIdentity(owner.getKind(), owner.getName()),
                        ownerIdentity(User.KIND, username)
                    );
                    // 移除权限检查，只检查是否被删除和是否是评论所有者
                    boolean hasPermission = (!commentHidden) || isCommentOwner;
                    if (ExtensionUtil.isDeleted(comment) || !hasPermission) {
                        return Mono.error(new org.springframework.web.server.ServerWebInputException(
                            "The comment was not found, hidden or deleted."
                        ));
                    }
                }

                var builder = ListOptions.builder();
                builder.andQuery(isNull("metadata.deletionTimestamp"));
                var visibleQuery = and(
                    equal("spec.hidden", BooleanUtils.FALSE),
                    equal("spec.approved", BooleanUtils.TRUE)
                );

                var isAnonymous = AnonymousUserConst.isAnonymousUser(username);
                if (isAnonymous) {
                    builder.andQuery(visibleQuery);
                } else if (!(commentHidden && isCommentOwner)) {
                    // 登录用户可以看到自己的评论或公开的评论
                    builder.andQuery(or(
                        equal("spec.owner", ownerIdentity(User.KIND, username)),
                        visibleQuery
                    ));
                }
                // View all replies if the user is not an anonymous user or is the comment owner.
                return Mono.just(builder);
            });
    }

    static Sort defaultCommentSort() {
        return Sort.by(Sort.Order.desc("spec.top"),
            Sort.Order.asc("spec.priority"),
            Sort.Order.desc("spec.creationTime"),
            Sort.Order.asc("metadata.name")
        );
    }
    public static Sort defaultReplySort() {
        return Sort.by(Sort.Order.asc("spec.creationTime"),
            Sort.Order.asc("metadata.name")
        );
    }

    int pageNullSafe(Integer page) {
        return defaultIfNull(page, 1);
    }

    int sizeNullSafe(Integer size) {
        return defaultIfNull(size, 100);
    }

    @Override
    public Mono<CommentWithReplyVo> getCommentWithReplies(String commentName, int replySize) {
        // 获取主评论
        return client.fetch(Comment.class, commentName)
            .flatMap(this::toCommentVo)
            .flatMap(commentVo -> {
                // 获取回复列表
                return listReply(commentName, 1, replySize)
                    .map(replyList -> CommentWithReplyVo.from(commentVo)
                        .setReplies(replyList)
                    );
            });
    }
}
