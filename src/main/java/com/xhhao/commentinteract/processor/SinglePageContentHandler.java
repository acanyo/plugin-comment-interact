
package com.xhhao.commentinteract.processor;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;
import org.springframework.util.PropertyPlaceholderHelper;
import reactor.core.publisher.Mono;
import run.halo.app.core.extension.content.Post;
import run.halo.app.core.extension.content.SinglePage;
import run.halo.app.theme.ReactivePostContentHandler;
import run.halo.app.theme.ReactiveSinglePageContentHandler;
import java.util.Properties;

@Slf4j
@Component
@RequiredArgsConstructor
public class SinglePageContentHandler implements ReactiveSinglePageContentHandler {
    
    static final PropertyPlaceholderHelper PROPERTY_PLACEHOLDER_HELPER = new PropertyPlaceholderHelper("${", "}");

    @Override
    public Mono<SinglePageContentContext> handle(@NotNull SinglePageContentContext singlePageContent) {
        injectDOM(singlePageContent);
        return Mono.just(singlePageContent);
    }
    private void injectDOM(SinglePageContentContext singlePageContent) {
        Properties properties = new Properties();
        SinglePage singlePage = singlePageContent.getSinglePage();
        properties.setProperty("kind", SinglePage.GVK.kind());
        properties.setProperty("group", SinglePage.GVK.group());
        properties.setProperty("name", singlePage.getMetadata().getName());

        String dom = PROPERTY_PLACEHOLDER_HELPER.replacePlaceholders(
            "<xhhao-barrage kind=\"${kind}\" group=\"${group}\" name=\"${name}\"></xhhao-barrage>",
            properties
        );

        singlePageContent.setContent(dom + "\n" + singlePageContent.getContent());
    }


}

