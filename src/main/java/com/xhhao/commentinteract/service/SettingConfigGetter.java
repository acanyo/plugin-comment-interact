package com.xhhao.commentinteract.service;

import java.util.List;
import lombok.Data;
import reactor.core.publisher.Mono;

public interface SettingConfigGetter {
    Mono<BasicConfig> getBasicConfig();

    @Data
    class BasicConfig {
        public static final String GROUP = "basic";
        private Integer barrageSpeed;
        private Integer barrageRows;
        private Boolean barrageLoop;
    }
}
