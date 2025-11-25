package com.xhhao.commentinteract.endpoint;

import static org.springdoc.core.fn.builders.apiresponse.Builder.responseBuilder;
import static org.springdoc.core.fn.builders.parameter.Builder.parameterBuilder;

import com.xhhao.commentinteract.model.CommentVo;
import com.xhhao.commentinteract.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.fn.builders.operation.Builder;
import org.springdoc.webflux.core.fn.SpringdocRouteBuilder;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;
import run.halo.app.core.extension.endpoint.CustomEndpoint;
import run.halo.app.extension.GroupVersion;

@Slf4j
@Component
@RequiredArgsConstructor
public class CommentEndpoint implements CustomEndpoint {

    private final CommentService commentService;

    @Override
    public RouterFunction<ServerResponse> endpoint() {
        final var tag = "api.comment.interact.xhhao.com/v1alpha1/Comment";
        return SpringdocRouteBuilder.route()
            .GET("comments", this::listComments, builder -> {
                builder.operationId("ListComments")
                    .tag(tag)
                    .description("获取评论和回复列表")
                    .response(responseBuilder()
                        .implementationArray(CommentVo.class));
            })
            .GET("comments/{name}", this::getCommentByName, builder -> {
                builder.operationId("GetCommentByName")
                    .tag(tag)
                    .description("根据名称获取单个评论或回复")
                    .response(responseBuilder()
                        .implementation(CommentVo.class));
            })
            .build();
    }

    private Mono<ServerResponse> listComments(ServerRequest request) {
        return ServerResponse.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(commentService.getComment(), CommentVo.class);
    }

    private Mono<ServerResponse> getCommentByName(ServerRequest request) {
        String name = request.pathVariable("name");
        return commentService.getCommentByName(name)
            .flatMap(commentVo -> ServerResponse.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(commentVo))
            .switchIfEmpty(ServerResponse.notFound().build());
    }

    @Override
    public GroupVersion groupVersion() {
        return GroupVersion.parseAPIVersion("api.comment.interact.xhhao.com/v1alpha1");
    }

}
