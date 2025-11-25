<script lang="ts" setup>
import type { NodeViewProps } from '@halo-dev/richtext-editor'
import { NodeViewWrapper } from '@halo-dev/richtext-editor'
import { computed, ref } from 'vue'
import { VButton, VEmpty, IconExchange } from '@halo-dev/components'
import CommentListModal from './CommentListModal.vue'
import CommentRender from './CommentRender.vue'

const props = defineProps<NodeViewProps>()

const commentNames = computed<string[]>(() => {
  return props.node?.attrs.names || (props.node?.attrs.name ? [props.node.attrs.name] : [])
})

const hasComments = computed(() => commentNames.value.length > 0)

const updateComments = (names: string[]) => {
  const safeNames = names.filter(Boolean)
  props.updateAttributes({
    name: safeNames[0] || null,
    names: safeNames,
  })
}

const removeName = (target: string) => {
  const next = commentNames.value.filter((name) => name !== target)
  updateComments(next)
}

const moveNameUp = (target: string) => {
  const list = [...commentNames.value]
  const index = list.indexOf(target)
  if (index <= 0) return
  ;[list[index - 1], list[index]] = [list[index], list[index - 1]]
  updateComments(list)
}

const moveNameDown = (target: string) => {
  const list = [...commentNames.value]
  const index = list.indexOf(target)
  if (index === -1 || index === list.length - 1) return
  ;[list[index + 1], list[index]] = [list[index], list[index + 1]]
  updateComments(list)
}

const commentModal = ref(false)
</script>

<template>
  <node-view-wrapper
    as="div"
    :class="['comment-container', { 'comment-container--selected': selected }]"
  >
    <div class="comment-nav">
      <div class="comment-nav-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="comment-icon"
        >
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
        </svg>
        <span class="text-sm font-medium text-gray-700">评论引用</span>
      </div>
      <div class="comment-nav-end">
        <VButton v-if="hasComments" size="sm" type="secondary" @click="commentModal = true">
          <template #icon>
            <IconExchange class="h-3.5 w-3.5" />
          </template>
          继续添加
        </VButton>
      </div>
    </div>
    <div class="comment-preview">
      <div v-if="hasComments" class="space-y-3">
        <div
          v-for="name in commentNames"
          :key="name"
          class="comment-item"
        >
          <div class="comment-item-header">
            <span class="comment-item-name">{{ name }}</span>
            <div class="comment-item-actions">
              <button
                class="comment-item-btn"
                title="上移"
                @click.stop.prevent="moveNameUp(name)"
              >
                ↑
              </button>
              <button
                class="comment-item-btn"
                title="下移"
                @click.stop.prevent="moveNameDown(name)"
              >
                ↓
              </button>
              <button
                class="comment-item-btn comment-item-btn-danger"
                title="删除"
                @click.stop.prevent="removeName(name)"
              >
                ✕
              </button>
            </div>
          </div>
          <CommentRender :name="name" />
        </div>
      </div>
      <VEmpty v-else message="当前未选择评论，点击下方按钮选择" title="未选择评论">
        <template #actions>
          <VButton type="primary" @click="commentModal = true">选择评论</VButton>
        </template>
      </VEmpty>
    </div>
    <CommentListModal
      v-if="commentModal"
      @close="commentModal = false"
      @select="updateComments"
    />
  </node-view-wrapper>
</template>

<style scoped>
.comment-container {
  border-radius: 8px;
  overflow: hidden;
  margin-top: 0.75em;
  border: 2px solid #e5e7eb;
  background: #ffffff;
  transition: all 0.2s;
}

.comment-container:hover {
  border-color: #d1d5db;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
}

.comment-container--selected {
  border-color: var(--primary-color, #4f46e5);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.comment-nav {
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  padding: 10px 14px;
  align-items: center;
  background: #f9fafb;
}

.comment-nav-start {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.comment-icon {
  color: #6b7280;
  flex-shrink: 0;
}

.comment-nav-end {
  display: flex;
  justify-content: flex-end;
}

.comment-preview {
  padding: 12px 14px;
  background: #ffffff;
}

/* 预览中的链接只用于展示，禁止点击跳转，避免误操作 */
.comment-preview a {
  pointer-events: none;
  color: inherit;
  text-decoration: none;
}

.comment-item {
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background-color: #ffffff;
  overflow: hidden;
}

.comment-item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.comment-item-name {
  font-size: 12px;
  color: #4b5563;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
}

.comment-item-actions {
  display: inline-flex;
  gap: 4px;
}

.comment-item-btn {
  border-radius: 4px;
  padding: 0 4px;
  font-size: 10px;
  line-height: 1.4;
  color: #6b7280;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.comment-item-btn:hover {
  background-color: #e5e7eb;
}

.comment-item-btn-danger {
  color: #dc2626;
}

.comment-item-btn-danger:hover {
  background-color: #fee2e2;
}
</style>
