package com.xhhao.commentinteract.model;

public record CommentVo(
    String kind,
    String name,
    String displayName,
    String content,
    String raw,
    String metadataName,
    String commentName,
    Boolean approved
) {
}
