<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import {
  VButton,
  VEmpty,
  VModal,
  VSpace,
  VLoading,
  VPagination,
  IconCheckboxCircle,
} from '@halo-dev/components'
import { commentApiClient, type CommentVo, type CommentListResult } from '@/api/comment'

const emit = defineEmits<{
  (event: 'close'): void
  (event: 'select', value: string[]): void
}>()

const modal = ref<InstanceType<typeof VModal> | null>(null)
const commentList = ref<CommentVo[]>([])
const isLoading = ref(false)
const isFetching = ref(false)
const keyword = ref<string>('')

// 分页
const page = ref(1)
const pageSize = ref(20)
const total = ref(0)
const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

// 监听页码或每页数量变化，重新加载数据
watch([page, pageSize], () => {
  fetchComments()
})

function handlePageChange(event: { page: number; size: number }) {
  page.value = event.page
  pageSize.value = event.size
}

async function fetchComments() {
  isFetching.value = true
  isLoading.value = commentList.value.length === 0
  try {
    const { data } = await commentApiClient.listComments(page.value, pageSize.value, keyword.value)
    commentList.value = data.items || []
    total.value = data.total || 0
  } catch (error) {
    console.error('Failed to fetch comments:', error)
    commentList.value = []
    total.value = 0
  } finally {
    isFetching.value = false
    isLoading.value = false
  }
}

// 初始加载
fetchComments()

const selectedNames = ref<string[]>([])

function toggleSelect(name: string) {
  if (selectedNames.value.includes(name)) {
    selectedNames.value = selectedNames.value.filter((n) => n !== name)
  } else {
    selectedNames.value = [...selectedNames.value, name]
  }
}

function handleSubmit() {
  if (!selectedNames.value.length) return
  emit('select', selectedNames.value)
  modal.value?.close()
}

function getAvatarText(name: string): string {
  return name ? name.charAt(0).toUpperCase() : '?'
}
</script>

<template>
  <VModal
    ref="modal"
    title="选择评论"
    :width="1600"
    layer-closable
    height="calc(100vh - 20px)"
    mount-to-body
    @close="emit('close')"
  >
    <div class="mb-6">
      <!-- 搜索框 -->
      <div class="search-group mb-3">
        <svg class="search-icon w-4 h-4" aria-hidden="true" viewBox="0 0 24 24">
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
          </g>
        </svg>
        <input
          v-model="keyword"
          type="search"
          placeholder="搜索评论内容、创建人或所有者..."
          class="search-input"
          @keydown.enter="fetchComments()"
        />
      </div>

      <!-- 统计信息 -->
      <div class="flex items-center justify-between text-xs px-1">
        <div class="text-gray-500">
          共 <span class="font-medium text-gray-700">{{ total }}</span> 条评论
          <span v-if="selectedNames.length > 0" class="ml-1.5 text-primary">
            · 已选 {{ selectedNames.length }} 条
          </span>
        </div>
        <div class="text-gray-400">
          {{ page }} / {{ totalPages }}
        </div>
      </div>
    </div>

    <div class="comment-list-container">
      <VLoading v-if="isLoading" />
      <template v-else-if="commentList.length > 0">
        <div class="masonry-container">
          <div
            v-for="comment in commentList"
            :key="comment.metadataName"
            :class="[
              'comment-card group relative cursor-pointer rounded-lg border-2 bg-white p-3 shadow-sm transition-all hover:shadow-md',
              selectedNames.includes(comment.metadataName)
                ? 'border-primary ring-2 ring-primary/20'
                : 'border-gray-200 hover:border-gray-300',
            ]"
            @click="toggleSelect(comment.metadataName)"
          >
            <!-- 选中标记 -->
            <div
              v-if="selectedNames.includes(comment.metadataName)"
              class="absolute right-2 top-2 text-primary"
            >
              <IconCheckboxCircle class="h-4 w-4" />
            </div>

            <!-- 评论头部 -->
            <div class="mb-2 flex items-center gap-2">
              <!-- 头像 -->
              <div class="avatar-wrapper flex-shrink-0">
                <img
                  v-if="comment.userAvatar"
                  :src="comment.userAvatar"
                  :alt="comment.displayName"
                  class="h-8 w-8 rounded-full object-cover"
                />
                <div
                  v-else
                  class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600"
                >
                  {{ getAvatarText(comment.displayName) }}
                </div>
              </div>
              <!-- 用户信息 -->
               <div class="flex flex-col min-w-0 flex-1">
                <span class="text-sm font-medium text-gray-900 truncate">{{ comment.displayName }}</span>
              </div>
            </div>

            <!-- 评论内容 -->
            <div class="comment-content text-sm text-gray-600" v-html="comment.content || comment.raw"></div>
          </div>
        </div>

        <!-- 分页 -->
        <div v-if="total > pageSize" class="mt-4 flex justify-center">
          <VPagination
            v-model:page="page"
            v-model:size="pageSize"
            :total="total"
            :size-options="[10, 20, 50, 100, 150]"
            show-total
            show-size-changer
          />
        </div>
      </template>
      <VEmpty v-else message="当前没有评论，你可以尝试刷新" title="没有评论">
        <template #actions>
          <VSpace>
            <VButton :loading="isFetching" @click="fetchComments"> 刷新 </VButton>
          </VSpace>
        </template>
      </VEmpty>
    </div>
    <template #footer>
      <VSpace>
        <VButton type="primary" :disabled="!selectedNames.length" @click="handleSubmit">
          <template #icon>
            <IconCheckboxCircle class="h-4 w-4" />
          </template>
          确认选择
        </VButton>
        <VButton @click="modal?.close()"> 取消 </VButton>
      </VSpace>
    </template>
  </VModal>
</template>

<style scoped>
/* 搜索框样式 */
.search-group {
  display: flex;
  line-height: 28px;
  align-items: center;
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  height: 40px;
  line-height: 28px;
  padding: 0 1rem;
  padding-left: 2.5rem;
  border: none;
  border-radius: 1rem;
  background: #f3f3f4;
  box-shadow: 5px 5px 10px #d1d1d1, -5px -5px 10px #ffffff;
  color: #0d0c22;
  transition: 0.3s;
  font-family: inherit;
}

.search-input::placeholder {
  color: #9e9ea7;
}

.search-input:focus {
  outline: none;
  background: #f3f3f4;
  box-shadow: inset 5px 5px 10px #d1d1d1, inset -5px -5px 10px #ffffff;
}

.search-icon {
  position: absolute;
  left: 1rem;
  fill: #9e9ea7;
  width: 1rem;
  height: 1rem;
  pointer-events: none;
}

/* 评论列表容器 */
.comment-list-container {
  min-height: 400px;
  max-height: calc(100vh - 320px);
  overflow-y: auto;
  padding: 4px;
}

/* 瀑布流布局 */
.masonry-container {
  column-count: 4;
  column-gap: 12px;
}

@media (max-width: 1280px) {
  .masonry-container {
    column-count: 3;
  }
}

@media (max-width: 1024px) {
  .masonry-container {
    column-count: 2;
  }
}

@media (max-width: 640px) {
  .masonry-container {
    column-count: 1;
  }
}

.comment-card {
  position: relative;
  overflow: hidden;
  break-inside: avoid;
  margin-bottom: 12px;
}

.comment-card:hover {
  transform: translateY(-1px);
}

.comment-content {
  word-break: break-word;
}

.avatar-wrapper img {
  border: 2px solid #e5e7eb;
}

/* 选择模式下禁用内容中的链接点击，避免误跳转 */
.comment-content :deep(a) {
  pointer-events: none;
  color: inherit;
  text-decoration: none;
  cursor: default;
}
</style>
