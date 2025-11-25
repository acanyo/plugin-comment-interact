package com.xhhao.commentinteract.service;

import com.xhhao.commentinteract.model.CommentVo;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import run.halo.app.extension.ListResult;


public interface CommentService {

    Flux<CommentVo> getComment();

    /**
     * 分页获取评论
     */
    Mono<ListResult<CommentVo>> getComments(int page, int size, String keyword);

    Mono<CommentVo> getCommentByName(String name);
}
