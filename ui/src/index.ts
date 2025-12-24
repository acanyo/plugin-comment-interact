import { definePlugin } from '@halo-dev/ui-shared'
import { CommentBlockExtension } from '@/editor'
import '@xhhaocom/comment-reference'

export default definePlugin({
  components: {},
  routes: [
  ],
  extensionPoints: {
    'default:editor:extension:create': () => {
      return [CommentBlockExtension]
    },
  },
})
