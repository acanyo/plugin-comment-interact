package com.xhhao.commentinteract.service;

import com.xhhao.commentinteract.model.CommentWithReplyVo;
import com.xhhao.commentinteract.model.CommentsVo;
import org.springframework.lang.Nullable;
import reactor.core.publisher.Mono;
import run.halo.app.extension.ListResult;
import run.halo.app.extension.PageRequest;
import run.halo.app.extension.Ref;

public interface CommentPublicQueryService {
    Mono<ListResult<CommentsVo>> list(Ref ref, @Nullable PageRequest pageRequest);
    Mono<ListResult<CommentWithReplyVo>> convertToWithReplyVo(ListResult<CommentsVo> comments,
        int replySize);
    
    /**
     * 根据主评论名称获取评论及其回复
     * @param commentName 主评论名称
     * @param replySize 回复数量
     * @return 包含评论和回复的结果
     */
    Mono<CommentWithReplyVo> getCommentWithReplies(String commentName, int replySize);
}