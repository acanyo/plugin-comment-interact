package com.xhhao.commentinteract.model;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;
import run.halo.app.core.extension.content.Comment;
import run.halo.app.extension.MetadataOperator;
import run.halo.app.theme.finders.vo.ExtensionVoOperator;

/**
 * A value object for {@link Comment}.
 *
 * @author guqing
 * @since 2.0.0
 */
@Data
@Accessors(chain = true)
@EqualsAndHashCode
public class CommentsVo implements ExtensionVoOperator {

    @Schema(requiredMode = REQUIRED)
    private MetadataOperator metadata;

    @Schema(requiredMode = REQUIRED)
    private Comment.CommentSpec spec;

    private Comment.CommentStatus status;

    @Schema(requiredMode = REQUIRED)
    private OwnerInfo owner;
    String refPost;
    String refUrl;

    /**
     * Convert {@link Comment} to {@link CommentsVo}.
     *
     * @param comment comment extension
     * @return a value object for {@link Comment}
     */
    public static CommentsVo from(Comment comment) {
        return new CommentsVo()
            .setMetadata(comment.getMetadata())
            .setSpec(comment.getSpec())
            .setStatus(comment.getStatus());
    }
}
