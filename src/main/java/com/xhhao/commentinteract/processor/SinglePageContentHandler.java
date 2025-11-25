
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
import java.util.Map;
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
        Map<String, String> annotations = singlePage.getMetadata().getAnnotations();
        if (annotations != null && annotations.containsKey("barrage.xhhao.com/pageEnable")) {
            properties.setProperty("kind", SinglePage.GVK.kind());
            properties.setProperty("group", SinglePage.GVK.group());
            properties.setProperty("name", singlePage.getMetadata().getName());
            // speed="20"     <!-- 滚动速度(秒)，越小越快，默认20 -->
            //     rows="8"       <!-- 轨道数量，默认8 -->
            //     loop="false"   <!-- 是否循环播放，默认false -->
            properties.setProperty("speed","10");
            properties.setProperty("rows","8");
            properties.setProperty("loop","false");

            String dom = PROPERTY_PLACEHOLDER_HELPER.replacePlaceholders(
                "<xhhao-barrage kind=\"${kind}\" group=\"${group}\" name=\"${name}\" speed=\"${speed}\" rows=\"${rows}\" loop=\"${loop}\"></xhhao-barrage>",
                properties
            );
            singlePageContent.setContent(dom + "\n" + singlePageContent.getContent());
        }

    }


}

