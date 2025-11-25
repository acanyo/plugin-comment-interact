package com.xhhao.commentinteract.service.impl;

import com.xhhao.commentinteract.extension.Comment;
import com.xhhao.commentinteract.extension.Reply;
import com.xhhao.commentinteract.model.CommentVo;
import com.xhhao.commentinteract.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import run.halo.app.core.extension.User;
import run.halo.app.core.user.service.UserService;
import run.halo.app.extension.ListOptions;
import run.halo.app.extension.ListResult;
import run.halo.app.extension.ReactiveExtensionClient;
import run.halo.app.extension.index.query.QueryFactory;
import run.halo.app.extension.router.selector.FieldSelector;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final ReactiveExtensionClient client;
    private final UserService userSvc;
    private ListOptions buildListOptions() {
        var listOptions = new ListOptions();
        listOptions.setFieldSelector(
            FieldSelector.of(QueryFactory.isNull("metadata.deletionTimestamp")));
        return listOptions;
    }
    @Override
    public Flux<CommentVo> getComment() {
        Flux<CommentVo> commentFlux = client.listAll(Comment.class, buildListOptions(), Sort.unsorted())
            .map(this::fromComment);

        Flux<CommentVo> replyFlux = client.listAll(Reply.class, buildListOptions(), Sort.unsorted())
            .map(this::fromReply);

        return Flux.concat(commentFlux, replyFlux);
    }

    @Override
    public Mono<ListResult<CommentVo>> getComments(int page, int size) {
        return getComment()
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
