package com.xhhao.commentinteract.service.impl;

import static org.springframework.data.domain.Sort.Order.desc;
import static run.halo.app.extension.index.query.Queries.contains;
import static run.halo.app.extension.index.query.Queries.isNull;
import static run.halo.app.extension.index.query.Queries.or;

import com.xhhao.commentinteract.extension.Comment;
import com.xhhao.commentinteract.extension.Reply;
import com.xhhao.commentinteract.model.CommentVo;
import com.xhhao.commentinteract.service.CommentService;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import run.halo.app.content.comment.CommentSubject;
import run.halo.app.core.extension.content.Post;
import run.halo.app.core.user.service.UserService;
import run.halo.app.extension.Extension;
import run.halo.app.extension.ListOptions;
import run.halo.app.extension.ListResult;
import run.halo.app.extension.ReactiveExtensionClient;
import run.halo.app.extension.Ref;
import run.halo.app.plugin.extensionpoint.ExtensionGetter;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final ReactiveExtensionClient client;
    private final UserService userSvc;
    private final ExtensionGetter extensionGetter;

    private ListOptions buildListOptions(String keyword, int flag) {
        var listOptions = new ListOptions();
        var builder = ListOptions.builder(listOptions);
        builder.andQuery(isNull("metadata.deletionTimestamp"));
        Optional.ofNullable(keyword)
            .filter(StringUtils::isNotBlank)
            .ifPresent(k -> {
                // 注意：spec.owner 索引存储的是 "kind:name" 格式的字符串
                // 如果要按 owner 精确查询，使用: equal("spec.owner", "Email:user@example.com")
                if (flag == 0) {
                    builder.andQuery(or(
                        contains("spec.raw", k),
                        contains("spec.owner", k)
                    ));
                } else {
                    builder.andQuery(or(
                        contains("spec.commentName", k),
                        contains("spec.owner", k)
                    ));
                }
            });
        return builder.build();
    }

    @Override
    public Flux<CommentVo> getComment() {
        return getComment(null);
    }
    public Flux<CommentVo> getComment(String keyword) {
        Flux<CommentVo> commentFlux = client.listAll(Comment.class, buildListOptions(keyword, 0), Sort.by(desc("spec.creationTime"),desc("metadata.name")))
            .flatMap(this::fromComment);

        Flux<CommentVo> replyFlux = client.listAll(Reply.class, buildListOptions(keyword, 1),Sort.by(desc("spec.creationTime"),desc("metadata.name")))
            .flatMap(this::fromReply);
        return Flux.concat(commentFlux, replyFlux);
    }

    @Override
    public Mono<ListResult<CommentVo>> getComments(int page, int size, String keyword) {
        return getComment(keyword)
            .collectList()
            .map(list -> {
                int total = list.size();
                int fromIndex = (page - 1) * size;
                int toIndex = Math.min(fromIndex + size, total);
                var items = fromIndex >= total 
                    ? List.<CommentVo>of()
                    : list.subList(fromIndex, toIndex);
                return new ListResult<>(page, size, total, items);
            });
    }

    @Override
    public Mono<CommentVo> getCommentByName(String name) {
        return client.fetch(Comment.class, name)
            .flatMap(this::fromComment)
            .switchIfEmpty(
                client.fetch(Reply.class, name)
                    .flatMap(this::fromReply)
            )
            .flatMap(this::enrichAvatar);
    }

    private Mono<CommentVo> fromComment(Comment comment) {
        String metadataName = comment.getMetadata() != null ? comment.getMetadata().getName() : null;
        Ref subjectRef = comment.getSpec().getSubjectRef();
        
        return getCommentSubject(subjectRef)
            .map(subject -> {
                String refPost = extractRefPost(subject);
                String refUrl = extractRefUrl(subject);
                return buildVo(Comment.KIND, metadataName, comment.getSpec(), null, subjectRef, refPost, refUrl);
            })
            .defaultIfEmpty(buildVo(Comment.KIND, metadataName, comment.getSpec(), null, subjectRef, null, null));
    }

    private Mono<CommentVo> fromReply(Reply reply) {
        String metadataName = reply.getMetadata() != null ? reply.getMetadata().getName() : null;
        String commentName = reply.getSpec().getCommentName();
        return client.fetch(Comment.class, commentName)
            .flatMap(comment -> fromComment(comment)
                .map(commentVo -> buildVo(
                    Reply.KIND, 
                    metadataName, 
                    reply.getSpec(), 
                    commentName, 
                    commentVo.ref(), 
                    commentVo.refPost(), 
                    commentVo.refUrl()
                ))
            )
            .defaultIfEmpty(buildVo(Reply.KIND, metadataName, reply.getSpec(), commentName, null, null, null));
    }
    @SuppressWarnings("unchecked")
    public Mono<Extension> getCommentSubject(Ref ref) {
        return extensionGetter.getExtensions(CommentSubject.class)
            .filter(subject -> subject.supports(ref))
            .next()
            .flatMap(subject -> subject.get(ref.getName()));
    }
    private CommentVo buildVo(String kind, String metadataName, Comment.BaseCommentSpec spec, String commentName, Ref ref, String refPost, String refUrl) {
        Comment.CommentOwner owner = spec != null ? spec.getOwner() : null;
        return new CommentVo(
            kind,
            owner != null ? owner.getName() : null,
            owner != null && owner.getKind().equals("Email") ? owner.getName() : null,
            owner != null ? owner.getDisplayName() : null,
            spec != null ? spec.getContent() : null,
            spec != null ? spec.getRaw() : null,
            metadataName,
            commentName,
            null,
            spec != null ? spec.getApproved() : null,
            ref,
            refPost,
            refUrl,
            owner != null ? owner.getKind() : null
        );
    }
    private Mono<CommentVo> enrichAvatar(CommentVo vo) {
        if (!"User".equals(vo.type()) || vo.name() == null || vo.name().isBlank()) {
            return Mono.just(vo);
        }

        return userSvc.getUserOrGhost(vo.name())
            .map(user -> withAvatar(vo,
                user.getSpec().getAvatar(),
                user.getSpec().getEmail()
            ))
            .defaultIfEmpty(vo);
    }
    private CommentVo withAvatar(CommentVo vo, String avatar, String email) {
        return new CommentVo(
            vo.kind(),
            vo.name(),
            email,
            vo.displayName(),
            vo.content(),
            vo.raw(),
            vo.metadataName(),
            vo.commentName(),
            avatar,
            vo.approved(),
            vo.ref(),
            vo.refPost(),
            vo.refUrl(),
            vo.type()
        );
    }

    public String extractRefPost(Extension subject) {
        return Optional.ofNullable(subject)
            .filter(s -> s.getMetadata() != null)
            .map(s -> {
                try {
                    if (s instanceof Post post) {
                        return post.getSpec().getTitle();
                    }
                    if ("SinglePage".equals(s.getClass().getSimpleName())) {
                        var spec = s.getClass().getMethod("getSpec").invoke(s);
                        return (String) spec.getClass().getMethod("getTitle").invoke(spec);
                    }
                    return null;
                } catch (Exception e) {
                    return null;
                }
            })
            .orElse(null);
    }
    
    public String extractRefUrl(Extension subject) {
        return Optional.ofNullable(subject)
            .map(s -> {
                try {
                    var status = s.getClass().getMethod("getStatus").invoke(s);
                    return Optional.ofNullable(status)
                        .map(st -> {
                            try {
                                return (String) st.getClass().getMethod("getPermalink").invoke(st);
                            } catch (Exception e) {
                                return null;
                            }
                        })
                        .orElse(null);
                } catch (Exception e) {
                    return null;
                }
            })
            .orElse(null);
    }


}
