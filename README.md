# Comment Interact

Halo 评论互动增强插件

## 简介

一款 Halo 编辑器扩展插件，支持在文章正文中以卡片或对话气泡形式引用和展示评论及其回复上下文，增强内容互动体验。

## 开发环境

- Java 21+
- Node.js 18+
- pnpm

## 开发

```bash
# 启用插件
./gradlew haloServer
# 开发前端
cd ui
pnpm install
pnpm dev
```

## 构建

```bash
./gradlew build
```

构建完成后，可以在 `build/libs` 目录找到插件 jar 文件。

## 许可证

[GPL-3.0](./LICENSE) © Handsome 