package com.xhhao.commentinteract.model;

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
    String type
) {
}
