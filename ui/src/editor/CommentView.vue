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

const currentType = computed(() => props.node?.attrs.type || 'reference')

const toggleType = () => {
  const newType = currentType.value === 'reference' ? 'conversation' : 'reference'
  props.updateAttributes({
    type: newType
  })
}

const updateComments = (names: string[], merge = true) => {
  let safeNames: string[]

  if (merge) {
    const existingNames = commentNames.value
    const allNames = [...new Set([...existingNames, ...names])]
    safeNames = allNames.filter(Boolean)
  } else {
    safeNames = names.filter(Boolean)
  }

  props.updateAttributes({
    name: safeNames[0] || null,
    names: safeNames,
  })
}

const removeName = (target: string) => {
  const next = commentNames.value.filter((name) => name !== target)
  updateComments(next, false)
}

const moveNameUp = (target: string) => {
  const list = [...commentNames.value]
  const index = list.indexOf(target)
  if (index <= 0) return
  ;[list[index - 1], list[index]] = [list[index], list[index - 1]]
  updateComments(list, false)
}

const moveNameDown = (target: string) => {
  const list = [...commentNames.value]
  const index = list.indexOf(target)
  if (index === -1 || index === list.length - 1) return
  ;[list[index + 1], list[index]] = [list[index], list[index + 1]]
  updateComments(list, false)
}

const commentModal = ref(false)
const showTooltip = ref(false)
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
        <span v-if="hasComments" class="toggle-tip">需清空评论后切换</span>
        <VButton
          size="sm"
          type="secondary"
          @click="toggleType"
          style="margin-right: 8px;"
          :disabled="hasComments"
        >
          {{ currentType === 'reference' ? '切换为对话样式' : '切换为卡片样式' }}
        </VButton>
        <VButton v-if="hasComments" size="sm" type="secondary" @click="commentModal = true">
          <template #icon>
            <IconExchange class="h-3.5 w-3.5" />
          </template>
          继续添加
        </VButton>
        <div
          class="mode-info-icon"
          @mouseenter="showTooltip = true"
          @mouseleave="showTooltip = false"
        >
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="M954.026667 407.893333c0-184.32-153.6-332.8-339.626667-324.266666-165.546667 8.533333-302.08 145.066667-308.906667 310.613333-5.12 129.706667 66.56 244.053333 172.373334 300.373333v116.053334c0 23.893333 18.773333 42.666667 42.666666 42.666666h216.746667c23.893333 0 42.666667-18.773333 42.666667-42.666666v-116.053334c102.4-52.906667 174.08-162.133333 174.08-286.72z" fill="currentColor" opacity=".3"></path>
            <path d="M619.52 856.746667H404.48c-37.546667 0-68.266667-30.72-68.266667-68.266667v-100.693333C223.573333 621.226667 157.013333 501.76 162.133333 370.346667 168.96 191.146667 315.733333 42.666667 494.933333 34.133333c97.28-5.12 189.44 29.013333 257.706667 97.28 69.973333 66.56 109.226667 157.013333 109.226667 252.586667 0 124.586667-66.56 238.933333-174.08 302.08v100.693333c1.706667 39.253333-29.013333 69.973333-68.266667 69.973334zM512 85.333333h-13.653333c-153.6 6.826667-278.186667 133.12-285.013334 286.72-5.12 116.053333 56.32 221.866667 158.72 276.48l13.653334 6.826667v131.413333c0 10.24 8.533333 17.066667 17.066666 17.066667h216.746667c10.24 0 17.066667-8.533333 17.066667-17.066667v-131.413333l13.653333-6.826667c98.986667-51.2 160.426667-153.6 160.426667-264.533333 0-81.92-32.426667-158.72-92.16-216.746667C662.186667 114.346667 588.8 85.333333 512 85.333333z" fill="currentColor"></path>
            <path d="M512 535.893333c-6.826667 0-13.653333-3.413333-18.773333-8.533333L395.946667 426.666667c-10.24-10.24-10.24-25.6 0-35.84 10.24-10.24 25.6-10.24 35.84 0l80.213333 81.92 81.92-81.92c10.24-10.24 25.6-10.24 35.84 0s10.24 25.6 0 35.84L529.066667 527.36c-3.413333 5.12-10.24 8.533333-17.066667 8.533333z" fill="currentColor"></path>
            <path d="M489.813333 512h51.2v319.146667h-51.2z" fill="currentColor"></path>
            <path d="M617.813333 989.866667H406.186667c-13.653333 0-25.6-11.946667-25.6-25.6S392.533333 938.666667 406.186667 938.666667h211.626666c13.653333 0 25.6 11.946667 25.6 25.6S631.466667 989.866667 617.813333 989.866667z" fill="currentColor"></path>
          </svg>
          <div v-if="showTooltip" class="mode-tooltip">
            <div class="tooltip-item">💡 <strong>卡片样式</strong>：仅展示所选评论本身的内容</div>
            <div class="tooltip-item">💬 <strong>对话样式</strong>：选择主评论后，自动展示该评论及其所有回复的对话树</div>
          </div>
        </div>
      </div>
    </div>
    <div class="comment-preview">
      <div v-if="hasComments" class="space-y-3">
        <template v-if="currentType === 'conversation'">
          <div class="comment-item">
            <div class="comment-item-header">
              <span class="comment-item-name">{{ commentNames[0] }}</span>
              <div class="comment-item-actions">
                <button
                  class="comment-item-btn comment-item-btn-danger"
                  title="删除"
                  @click.stop.prevent="removeName(commentNames[0])"
                >
                  ✕
                </button>
              </div>
            </div>
            <CommentRender :name="commentNames[0]" :type="currentType" />
          </div>
          <div v-if="commentNames.length > 1" class="text-xs text-gray-500 text-center py-2">
            对话模式下仅展示第一条评论的对话树，其余 {{ commentNames.length - 1 }} 条已隐藏
          </div>
        </template>
        <template v-else>
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
            <CommentRender :name="name" :type="currentType" />
          </div>
        </template>
      </div>
      <VEmpty v-else message="当前未选择评论，点击下方按钮选择" title="未选择评论">
        <template #actions>
          <VButton type="primary" @click="commentModal = true">选择评论</VButton>
        </template>
      </VEmpty>
    </div>
    <CommentListModal
      v-if="commentModal"
      :type="currentType"
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
  position: relative;
  overflow: visible;
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
  align-items: center;
  position: relative;
}

.toggle-tip {
  font-size: 12px;
  color: #9ca3af;
  margin-right: 8px;
  white-space: nowrap;
}

.mode-info-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  margin-left: 8px;
  cursor: help;
  color: #9ca3af;
  transition: all 0.2s ease;
  position: relative;
  z-index: 10;
}

.mode-info-icon:hover {
  color: #f59e0b;
  transform: scale(1.1);
}

.mode-info-icon svg {
  width: 18px;
  height: 18px;
}

.mode-tooltip {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 10px 12px;
  min-width: 280px;
  z-index: 9999;
  animation: tooltipFadeIn 0.15s ease-out;
  pointer-events: none;
}

:host(.dark) .mode-tooltip {
  background: #1f2937;
  border-color: #374151;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

@keyframes tooltipFadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tooltip-item {
  font-size: 12px;
  line-height: 1.6;
  color: #374151;
  padding: 4px 0;
}

:host(.dark) .tooltip-item {
  color: #d1d5db;
}

.tooltip-item:not(:last-child) {
  border-bottom: 1px solid #f3f4f6;
  padding-bottom: 8px;
  margin-bottom: 4px;
}

:host(.dark) .tooltip-item:not(:last-child) {
  border-bottom-color: #374151;
}

.tooltip-item strong {
  color: #111827;
}

:host(.dark) .tooltip-item strong {
  color: #f9fafb;
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
