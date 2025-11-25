
package com.xhhao.commentinteract.processor;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;
import org.springframework.util.PropertyPlaceholderHelper;
import reactor.core.publisher.Mono;
import run.halo.app.core.extension.content.Post;
import run.halo.app.theme.ReactivePostContentHandler;

import java.util.Properties;

@Slf4j
@Component
@RequiredArgsConstructor
public class PostContentHandler implements ReactivePostContentHandler {
    
    static final PropertyPlaceholderHelper PROPERTY_PLACEHOLDER_HELPER = new PropertyPlaceholderHelper("${", "}");


    @Override
    public Mono<PostContentContext> handle(@NotNull PostContentContext contentContext) {
        injectDOM(contentContext);
        return Mono.just(contentContext);
    }

    private void injectDOM(PostContentContext contentContext) {
        Properties properties = new Properties();
        Post post = contentContext.getPost();
        properties.setProperty("kind", Post.GVK.kind());
        properties.setProperty("group", Post.GVK.group());
        properties.setProperty("name", post.getMetadata().getName());
        
        String dom = PROPERTY_PLACEHOLDER_HELPER.replacePlaceholders(
            "<xhhao-barrage kind=\"${kind}\" group=\"${group}\" name=\"${name}\"></xhhao-barrage>",
            properties
        );
        
        contentContext.setContent(dom + "\n" + contentContext.getContent());
    }
}

