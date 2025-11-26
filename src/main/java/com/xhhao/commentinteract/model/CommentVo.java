package com.xhhao.commentinteract.model;

import run.halo.app.extension.Ref;

public record CommentVo(
    String kind,
    String name,
    String email,
    String displayName,
    String content,
    String raw,
    String metadataName,
    String commentName,
    String userAvatar,
    Boolean approved,
    Ref ref,
    String refPost,
    String refUrl,
    String type
) {
}
