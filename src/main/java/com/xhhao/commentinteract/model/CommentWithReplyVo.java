package com.xhhao.commentinteract.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;
import org.springframework.beans.BeanUtils;
import run.halo.app.extension.ListResult;

/**
 * <p>A value object for comment with reply.</p>
 *
 * @author guqing
 * @since 2.14.0
 */
@Data
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = true)
public class CommentWithReplyVo extends CommentsVo {

    private ListResult<ReplyVo> replies;

    /**
     * Convert {@link CommentsVo} to {@link CommentWithReplyVo}.
     */
    public static CommentWithReplyVo from(CommentsVo commentVo) {
        var commentWithReply = new CommentWithReplyVo();
        BeanUtils.copyProperties(commentVo, commentWithReply);
        commentWithReply.setReplies(ListResult.emptyResult());
        return commentWithReply;
    }
}
