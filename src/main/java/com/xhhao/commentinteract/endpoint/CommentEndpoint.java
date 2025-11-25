package com.xhhao.commentinteract.endpoint;

import static com.xhhao.commentinteract.service.impl.CommentPublicQueryServiceImpl.defaultReplySort;
import static org.springdoc.core.fn.builders.apiresponse.Builder.responseBuilder;
import static org.springdoc.core.fn.builders.parameter.Builder.parameterBuilder;

import com.xhhao.commentinteract.model.CommentVo;
import com.xhhao.commentinteract.service.CommentPublicQueryService;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import run.halo.app.extension.ListResult;
import com.xhhao.commentinteract.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.webflux.core.fn.SpringdocRouteBuilder;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;
import run.halo.app.core.extension.endpoint.CustomEndpoint;
import run.halo.app.extension.GroupVersion;
import run.halo.app.extension.PageRequestImpl;
import run.halo.app.extension.Ref;

@Slf4j
@Component
@RequiredArgsConstructor
public class CommentEndpoint implements CustomEndpoint {

    private final CommentService commentService;
    private final CommentPublicQueryService commentPublicQueryService;

    @Override
    public RouterFunction<ServerResponse> endpoint() {
        final var tag = "api.comment.interact.xhhao.com/v1alpha1/Comment";
        return SpringdocRouteBuilder.route()
            .GET("allComments", this::listComments, builder -> {
                builder.operationId("ListComments")
                    .tag(tag)
                    .description("分页获取评论和回复列表")
                    .parameter(parameterBuilder()
                        .name("page")
                        .in(ParameterIn.QUERY)
                        .description("页码，从1开始")
                        .required(false))
                    .parameter(parameterBuilder()
                        .name("size")
                        .in(ParameterIn.QUERY)
                        .description("每页数量")
                        .required(false))
                    .response(responseBuilder()
                        .implementation(ListResult.class));
            })
            .GET("commentList", this::listCommentList, builder -> {
                builder.operationId("ListCommentList")
                    .tag(tag)
                    .description("分页获取评论和回复列表（支持按资源过滤）")
                    .parameter(parameterBuilder()
                        .name("group")
                        .in(ParameterIn.QUERY)
                        .description("资源组，如 content.halo.run")
                        .required(false))
                    .parameter(parameterBuilder()
                        .name("kind")
                        .in(ParameterIn.QUERY)
                        .description("资源类型，如 Post, SinglePage")
                        .required(false))
                    .parameter(parameterBuilder()
                        .name("version")
                        .in(ParameterIn.QUERY)
                        .description("资源版本，如 v1alpha1")
                        .required(false))
                    .parameter(parameterBuilder()
                        .name("name")
                        .in(ParameterIn.QUERY)
                        .description("资源名称")
                        .required(false))
                    .parameter(parameterBuilder()
                        .name("page")
                        .in(ParameterIn.QUERY)
                        .description("页码，从1开始")
                        .required(false))
                    .parameter(parameterBuilder()
                        .name("size")
                        .in(ParameterIn.QUERY)
                        .description("每页数量")
                        .required(false))
                    .parameter(parameterBuilder()
                        .name("replySize")
                        .in(ParameterIn.QUERY)
                        .description("每条评论的回复数量")
                        .required(false))
                    .response(responseBuilder()
                        .implementation(ListResult.class));
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

    private Mono<ServerResponse> listCommentList(ServerRequest request) {
        // 获取分页参数
        int page = request.queryParam("page").map(Integer::parseInt).orElse(1);
        int size = request.queryParam("size").map(Integer::parseInt).orElse(100);
        int replySize = request.queryParam("replySize").map(Integer::parseInt).orElse(100);

        // 构建 Ref（如果提供了参数）
        Ref ref = null;
        if (request.queryParam("group").isPresent()
            && request.queryParam("kind").isPresent()
            && request.queryParam("name").isPresent()) {
            ref = new Ref();
            ref.setGroup(request.queryParam("group").get());
            ref.setKind(request.queryParam("kind").get());
            ref.setVersion(request.queryParam("version").orElse("v1alpha1"));
            ref.setName(request.queryParam("name").get());
        }

        return commentPublicQueryService.list(ref, PageRequestImpl.of(page, size, defaultReplySort()))
            .flatMap(result -> commentPublicQueryService.convertToWithReplyVo(result, replySize))
            .flatMap(list -> ServerResponse.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(list));
    }

    private Mono<ServerResponse> listComments(ServerRequest request) {
        int page = request.queryParam("page").map(Integer::parseInt).orElse(1);
        int size = request.queryParam("size").map(Integer::parseInt).orElse(12);
        String keyword = request.queryParam("keyword").orElse(null);
        return commentService.getComments(page, size, keyword)
            .flatMap(result -> ServerResponse.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(result));
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
