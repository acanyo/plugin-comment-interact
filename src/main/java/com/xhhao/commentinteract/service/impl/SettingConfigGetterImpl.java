package com.xhhao.commentinteract.service.impl;

import com.xhhao.commentinteract.service.SettingConfigGetter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import run.halo.app.plugin.ReactiveSettingFetcher;

@Slf4j
@Component
@RequiredArgsConstructor
public class SettingConfigGetterImpl implements SettingConfigGetter {
    private final ReactiveSettingFetcher settingFetcher;

    @Override
    public Mono<BasicConfig> getBasicConfig() {
        return settingFetcher.fetch(BasicConfig.GROUP, BasicConfig.class)
            .defaultIfEmpty(new BasicConfig());
    }
}
