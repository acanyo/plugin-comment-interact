<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import '@xhhaocom/comment-reference'

const props = defineProps<{
  name: string
}>()

const loaded = ref(false)

onMounted(() => {
  loaded.value = true
})
</script>

<template>
  <div v-if="loaded" class="comment-render-wrapper">
    <comment-reference :name="name"></comment-reference>
  </div>
  <div v-else class="comment-loading">加载中...</div>
</template>

<style scoped>
.comment-render-wrapper {
  width: 100%;
}

.comment-loading {
  padding: 20px;
  text-align: center;
  color: #999;
}
</style>
