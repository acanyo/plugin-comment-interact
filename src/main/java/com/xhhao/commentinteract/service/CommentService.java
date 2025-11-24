package com.xhhao.commentinteract.service;

import com.xhhao.commentinteract.model.CommentVo;
import reactor.core.publisher.Flux;


public interface CommentService {

    Flux<CommentVo> getComment();
}
