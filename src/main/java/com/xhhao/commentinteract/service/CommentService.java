package com.xhhao.commentinteract.service;

import com.xhhao.commentinteract.model.CommentVo;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


public interface CommentService {

    Flux<CommentVo> getComment();

    Mono<CommentVo> getCommentByName(String name);
}
