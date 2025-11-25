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

    /**
     * 根据 kind 和 name 获取评论数据（调用 Halo API）
     * @param kind 资源类型，如 SinglePage, Post 等
     * @param name 资源名称
     * @return 评论列表的 Flux
     */
    // Flux<CommentVo> getCommentsByKindAndName(String kind, String name);
}
