package com.xhhao.commentinteract.service.impl;

import static org.springframework.data.domain.Sort.Order.desc;
import static run.halo.app.extension.index.query.QueryFactory.contains;
import static run.halo.app.extension.index.query.QueryFactory.or;

import com.xhhao.commentinteract.extension.Comment;
import com.xhhao.commentinteract.extension.Reply;
import com.xhhao.commentinteract.model.CommentVo;
import com.xhhao.commentinteract.service.CommentService;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import run.halo.app.core.user.service.UserService;
import org.springframework.web.reactive.function.client.WebClient;
import com.fasterxml.jackson.databind.JsonNode;
import run.halo.app.extension.ListOptions;
import run.halo.app.extension.ListResult;
import run.halo.app.extension.ReactiveExtensionClient;
import run.halo.app.extension.index.query.QueryFactory;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final ReactiveExtensionClient client;
    private final UserService userSvc;

    private ListOptions buildListOptions(String keyword, int flag) {
        var listOptions = new ListOptions();
        var builder = ListOptions.builder(listOptions);
        builder.andQuery(QueryFactory.isNull("metadata.deletionTimestamp"));
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
            .map(this::fromComment);

        Flux<CommentVo> replyFlux = client.listAll(Reply.class, buildListOptions(keyword, 1),Sort.by(desc("spec.creationTime"),desc("metadata.name")))
            .map(this::fromReply);

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
                    ? java.util.List.<CommentVo>of() 
                    : list.subList(fromIndex, toIndex);
                
                return new ListResult<>(page, size, total, items);
            });
    }

    @Override
    public Mono<CommentVo> getCommentByName(String name) {
        return client.fetch(Comment.class, name)
            .map(this::fromComment)
            .switchIfEmpty(
                client.fetch(Reply.class, name)
                    .map(this::fromReply)
            )
            .flatMap(this::enrichAvatar);
    }

    private CommentVo fromComment(Comment comment) {
        String metadataName = comment.getMetadata() != null ? comment.getMetadata().getName() : null;
        return buildVo(Comment.KIND, metadataName, comment.getSpec(), null);
    }

    private CommentVo fromReply(Reply reply) {
        String metadataName = reply.getMetadata() != null ? reply.getMetadata().getName() : null;
        return buildVo(Reply.KIND, metadataName, reply.getSpec(), reply.getSpec().getCommentName());
    }

    private CommentVo buildVo(String kind, String metadataName, Comment.BaseCommentSpec spec,String commentName) {
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
            vo.type()
        );
    }


}
