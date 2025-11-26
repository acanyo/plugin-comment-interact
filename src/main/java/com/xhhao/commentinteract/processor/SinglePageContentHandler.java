
package com.xhhao.commentinteract.processor;

import com.xhhao.commentinteract.service.SettingConfigGetter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;
import org.springframework.util.PropertyPlaceholderHelper;
import reactor.core.publisher.Mono;
import run.halo.app.core.extension.content.SinglePage;
import run.halo.app.theme.ReactiveSinglePageContentHandler;
import java.util.Map;
import java.util.Optional;
import java.util.Properties;

@Slf4j
@Component
@RequiredArgsConstructor
public class SinglePageContentHandler implements ReactiveSinglePageContentHandler {
    
    static final PropertyPlaceholderHelper PROPERTY_PLACEHOLDER_HELPER = new PropertyPlaceholderHelper("${", "}");
    private final SettingConfigGetter settingConfigGetter;

    @Override
    public Mono<SinglePageContentContext> handle(@NotNull SinglePageContentContext singlePageContent) {
        return settingConfigGetter.getBasicConfig()
            .flatMap(config -> {
                injectDOM(singlePageContent, config);
                return Mono.just(singlePageContent);
            });
    }

    private void injectDOM(SinglePageContentContext singlePageContent, SettingConfigGetter.BasicConfig config) {
        Properties properties = new Properties();
        SinglePage singlePage = singlePageContent.getSinglePage();
        Map<String, String> annotations = singlePage.getMetadata().getAnnotations();
        if (annotations != null && annotations.containsKey("barrage.xhhao.com/postEnable") && annotations.get("barrage.xhhao.com/postEnable").equals("true")) {
        properties.setProperty("kind", SinglePage.GVK.kind());
        properties.setProperty("group", SinglePage.GVK.group());
        properties.setProperty("name", singlePage.getMetadata().getName());
        properties.setProperty("speed", String.valueOf(Optional.ofNullable(config.getBarrageSpeed()).orElse(20)));
        properties.setProperty("rows", String.valueOf(Optional.ofNullable(config.getBarrageRows()).orElse(8)));
        properties.setProperty("loop", String.valueOf(Optional.ofNullable(config.getBarrageLoop()).orElse(false)));

        String dom = PROPERTY_PLACEHOLDER_HELPER.replacePlaceholders(
            "<xhhao-barrage kind=\"${kind}\" group=\"${group}\" name=\"${name}\" speed=\"${speed}\" rows=\"${rows}\" loop=\"${loop}\"></xhhao-barrage>",
            properties
        );

            singlePageContent.setContent(dom + "\n" + singlePageContent.getContent());
        }
    }
}

