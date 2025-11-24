package com.xhhao.commentinteract.service.impl;

import com.xhhao.commentinteract.extension.Comment;
import com.xhhao.commentinteract.extension.Reply;
import com.xhhao.commentinteract.model.CommentVo;
import com.xhhao.commentinteract.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import run.halo.app.extension.ListOptions;
import run.halo.app.extension.ReactiveExtensionClient;
import run.halo.app.extension.index.query.QueryFactory;
import run.halo.app.extension.router.selector.FieldSelector;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final ReactiveExtensionClient client;
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
            owner != null ? owner.getDisplayName() : null,
            spec != null ? spec.getContent() : null,
            spec != null ? spec.getRaw() : null,
            metadataName,
            commentName,
            spec != null ? spec.getApproved() : null
        );
    }
}
