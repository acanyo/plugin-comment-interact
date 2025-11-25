# 评论引用编辑器功能说明

## 功能概述

本插件为 Halo 编辑器添加了评论引用功能，允许用户在文章中插入评论引用块，展示特定评论的内容。

## 项目结构

```
plugin-comment-interact/
├── packages/                    # Web Component 包
│   ├── src/
│   │   ├── comment/
│   │   │   ├── comment-reference.ts    # 评论引用 Web Component
│   │   │   ├── comment-api.ts          # 评论 API 调用
│   │   │   ├── comment-styles.ts       # 样式定义
│   │   │   └── comment-types.ts        # 类型定义
│   │   └── index.ts
│   └── package.json             # 已添加 Vue 依赖
│
└── ui/                          # Halo 插件前端
    ├── src/
    │   ├── api/
    │   │   └── comment.ts       # 评论 API 客户端
    │   ├── editor/
    │   │   ├── comment-block-extension.ts   # 编辑器扩展
    │   │   ├── CommentView.vue              # 编辑器视图组件
    │   │   ├── CommentListModal.vue         # 评论选择模态框
    │   │   ├── CommentRender.vue            # 评论渲染组件
    │   │   └── index.ts                     # 导出
    │   └── index.ts             # 插件入口（已注册扩展）
    └── package.json             # 已添加必要依赖
```

## 安装依赖

### 1. 安装 packages 包依赖

```bash
cd packages
pnpm install
```

### 2. 安装 ui 包依赖

```bash
cd ui
pnpm install
```

## 构建

### 1. 构建 packages 包

```bash
cd packages
pnpm build
```

这会生成 `dist/comment-reference.js` 和 `dist/comment-reference.umd.js` 文件。

### 2. 构建 ui 包

```bash
cd ui
pnpm build
```

### 3. 构建整个插件

```bash
# 在项目根目录
./gradlew build
```

## 开发

### 1. 启动 Halo 开发服务器

```bash
./gradlew haloServer
```

### 2. 启动前端开发

```bash
cd ui
pnpm dev
```

## 使用方式

### 在编辑器中使用

1. 打开 Halo 文章编辑器
2. 点击工具栏的 **评论引用** 按钮（或使用命令菜单输入 "评论"）
3. 在弹出的模态框中选择要引用的评论
4. 点击 **选择** 按钮插入评论引用块

### 评论引用块功能

- **选择评论**：首次插入时选择评论
- **更换评论**：点击 **更换** 按钮重新选择评论
- **删除引用**：选中引用块后，使用气泡菜单的删除按钮

### 评论选择模态框功能

- **搜索**：在搜索框中输入关键词过滤评论（支持搜索显示名称和内容）
- **刷新**：点击刷新按钮重新加载评论列表
- **预览**：点击评论卡片查看完整内容
- **选择**：点击评论卡片选中，再点击底部 **选择** 按钮确认

## API 接口

### 后端接口

- `GET /apis/api.comment.interact.xhhao.com/v1alpha1/comments`
  - 获取所有评论列表
  - 返回：`CommentVo[]`

- `GET /apis/api.comment.interact.xhhao.com/v1alpha1/comments/{name}`
  - 根据名称获取单个评论
  - 返回：`CommentVo`

### CommentVo 数据结构

```typescript
interface CommentVo {
  kind: string
  name: string
  email?: string
  displayName: string
  content: string
  raw: string
  metadataName: string
  commentName?: string
  userAvatar?: string
  approved: boolean
  type?: string
}
```

## 渲染

评论引用在文章中会渲染为 `<comment-reference>` Web Component，自动从后端获取评论数据并展示。

### 最终 HTML 输出

```html
<comment-reference name="comment-xxx"></comment-reference>
```

## 注意事项

1. **依赖安装**：确保运行 `pnpm install` 安装所有依赖
2. **构建顺序**：先构建 `packages`，再构建 `ui`
3. **API 权限**：确保后端 API 接口已正确配置并可访问
4. **评论审核**：只有已审核的评论才会在选择列表中显示（可在代码中调整）

## TypeScript 错误说明

当前 IDE 中显示的 TypeScript 错误（如找不到 `@halo-dev/richtext-editor` 模块）是正常的，因为：

1. 这些依赖在运行时由 Halo 提供
2. 需要运行 `pnpm install` 安装依赖后错误会消失
3. 不影响实际构建和运行

## 故障排查

### 评论列表为空

- 检查后端 API 是否正常返回数据
- 检查浏览器控制台是否有网络错误
- 确认评论是否已审核通过

### 评论引用不显示

- 检查 `packages` 包是否已正确构建
- 确认 `comment-reference.umd.js` 是否已复制到 `src/main/resources/static`
- 检查浏览器控制台是否有 JavaScript 错误

### 编辑器扩展未加载

- 确认 `ui/src/index.ts` 中已正确注册扩展点
- 检查 Halo 版本是否支持 `default:editor:extension:create` 扩展点
- 重新构建并重启 Halo 服务器
