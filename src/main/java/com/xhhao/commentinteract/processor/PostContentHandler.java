package com.xhhao.commentinteract.processor;

import com.xhhao.commentinteract.service.SettingConfigGetter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;
import org.springframework.util.PropertyPlaceholderHelper;
import reactor.core.publisher.Mono;
import run.halo.app.core.extension.content.Post;
import run.halo.app.theme.ReactivePostContentHandler;

import java.util.Map;
import java.util.Optional;
import java.util.Properties;

@Slf4j
@Component
@RequiredArgsConstructor
public class PostContentHandler implements ReactivePostContentHandler {
    
    static final PropertyPlaceholderHelper PROPERTY_PLACEHOLDER_HELPER = new PropertyPlaceholderHelper("${", "}");
    private final SettingConfigGetter settingConfigGetter;

    @Override
    public Mono<PostContentContext> handle(@NotNull PostContentContext contentContext) {
        return settingConfigGetter.getBasicConfig()
            .flatMap(config -> {
                injectDOM(contentContext, config);
                return Mono.just(contentContext);
            });
    }

    private void injectDOM(PostContentContext contentContext, SettingConfigGetter.BasicConfig config) {
        Properties properties = new Properties();
        Post post = contentContext.getPost();
        Map<String, String> annotations = post.getMetadata().getAnnotations();
        if (annotations != null && annotations.containsKey("barrage.xhhao.com/postEnable") && annotations.get("barrage.xhhao.com/postEnable").equals("true")) {
        properties.setProperty("kind", Post.GVK.kind());
        properties.setProperty("group", Post.GVK.group());
        properties.setProperty("name", post.getMetadata().getName());
        properties.setProperty("speed", String.valueOf(Optional.ofNullable(config.getBarrageSpeed()).orElse(20)));
        properties.setProperty("rows", String.valueOf(Optional.ofNullable(config.getBarrageRows()).orElse(8)));
        properties.setProperty("loop", String.valueOf(Optional.ofNullable(config.getBarrageLoop()).orElse(false)));

        String dom = PROPERTY_PLACEHOLDER_HELPER.replacePlaceholders(
            "<xhhao-barrage kind=\"${kind}\" group=\"${group}\" name=\"${name}\" speed=\"${speed}\" rows=\"${rows}\" loop=\"${loop}\"></xhhao-barrage>",
            properties
        );

            contentContext.setContent(dom + "\n" + contentContext.getContent());
        }
    }
}

