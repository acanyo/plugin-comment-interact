import {
  type Editor,
  isActive,
  mergeAttributes,
  Node,
  nodeInputRule,
  type Range,
  VueNodeViewRenderer,
  type EditorState,
  nodePasteRule,
} from '@halo-dev/richtext-editor'
import CommentView from './CommentView.vue'
import { markRaw } from 'vue'
import { ToolboxItem } from '@halo-dev/richtext-editor'
import MdiDeleteForeverOutline from '~icons/mdi/delete-forever-outline?color=red'
import MdiCommentQuote from '~icons/mdi/comment-quote?width=1.2em&height=1.2em'
import { deleteNode } from '@/utils/delete-node'

declare module '@halo-dev/richtext-editor' {
  interface Commands<ReturnType> {
    'comment-block': {
      setCommentBlock: (options: { name?: string; names?: string[] }) => ReturnType
      setCommentConversation: (options: { name?: string; names?: string[] }) => ReturnType
    }
  }
}

const CommentBlockExtension = Node.create({
  name: 'comment-block',
  fakeSelection: true,

  group() {
    return 'block'
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      name: {
        default: null,
        parseHTML: (element) => {
          return element.getAttribute('name')
        },
        renderHTML: (attributes) => {
          return { name: attributes.name, type: attributes.type }
        },
      },
      type: {
        default: 'reference',
        parseHTML: (element) => {
          // 尝试从属性获取，如果没有则根据标签名推断
          const type = element.getAttribute('type')
          if (type) return type
          if (element.tagName.toLowerCase() === 'comment-conversation') return 'conversation'
          return 'reference'
        },
        renderHTML: (attributes) => {
          return { type: attributes.type }
        },
      },
      // 多个评论名称，仅用于编辑器内部状态，不输出到最终 HTML 属性
      names: {
        default: null,
        parseHTML: () => null,
        renderHTML: () => ({}),
      },
    }
  },

  parseHTML() {
    return [
      {
        // 优先匹配包含多个评论的容器
        tag: 'div.comment-reference-group',
        getAttrs: (node) => {
          if (typeof node === 'string') return false
          const element = node as HTMLElement
          const commentElements = element.querySelectorAll('comment-reference')

          if (commentElements.length === 0) return false

          const names: string[] = []
          commentElements.forEach((el) => {
            const name = el.getAttribute('name')
            if (name) names.push(name)
          })

          return {
            name: names[0] || null,
            names: names.length > 0 ? names : null,
          }
        },
      },
      {
        tag: 'comment-reference',
        getAttrs: (node) => {
          if (typeof node === 'string') return false
          const element = node as HTMLElement
          const name = element.getAttribute('name')
          return {
            name: name || null,
            names: name ? [name] : null,
            type: 'reference',
          }
        },
      },
      {
        tag: 'comment-conversation',
        getAttrs: (node) => {
          if (typeof node === 'string') return false
          const element = node as HTMLElement
          const name = element.getAttribute('name')
          return {
            name: name || null,
            names: name ? [name] : null,
            type: 'conversation',
          }
        },
      },
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    const attrs = mergeAttributes(HTMLAttributes) as { name?: string; type?: string }
    const rawNames = (node.attrs as any).names as string[] | null | undefined
    const type = attrs.type || 'reference'
    const tagName = type === 'conversation' ? 'comment-conversation' : 'comment-reference'

    const names: string[] = Array.isArray(rawNames)
      ? rawNames
      : attrs.name
      ? [attrs.name]
      : []

    if (!names.length) {
      return ['div', { class: 'comment-reference-group' }, [tagName, { type }]]
    }

    const children: any[] = []
    names.forEach((n, index) => {
      // 用 div 包裹每个评论，添加间距样式
      children.push([
        'div',
        { style: index > 0 ? 'margin-top: 0.8rem;' : '' },
        [tagName, { name: n, class: 'comment-reference-item', type }]
      ])
    })
    return ['div', { class: 'comment-reference-group' }, ...children]
  },

  addCommands() {
    return {
      setCommentBlock:
        (options) =>
        ({ commands }) => {
          const names = options.names && options.names.length ? options.names : options.name ? [options.name] : []
          return commands.insertContent([
            {
              type: this.name,
              attrs: {
                name: names[0] || null,
                names,
                type: 'reference', // 默认为引用，对话需要在 UI 上显式切换
              },
            },
            {
              type: 'paragraph',
              content: '',
            },
          ])
        },
      setCommentConversation:
        (options: { name?: string; names?: string[] }) =>
        ({ commands }: { commands: any }) => {
          const names = options.names && options.names.length ? options.names : options.name ? [options.name] : []
          return commands.insertContent([
            {
              type: this.name,
              attrs: {
                name: names[0] || null,
                names,
                type: 'conversation',
              },
            },
            {
              type: 'paragraph',
              content: '',
            },
          ])
        },
    }
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: /comment-reference$/,
        type: this.type,
        getAttributes: (e) => ({
          name: e[1],
        }),
      }),
    ]
  },

  addPasteRules() {
    return [
      nodePasteRule({
        find: /<comment-reference\s+name="(\S+)"\s*><\/comment-reference>/g,
        type: this.type,
        getAttributes: (e) => ({
          name: e[1],
        }),
      }),
    ]
  },

  addNodeView() {
    return VueNodeViewRenderer(CommentView)
  },

  addOptions() {
    return {
      getCommandMenuItems() {
        return {
          priority: 201,
          icon: markRaw(MdiCommentQuote),
          title: '添加评论引用',
          keywords: ['comment-reference', 'comment', '评论', '引用'],
          command: ({ editor, range }: { editor: Editor; range: Range }) => {
            editor.chain().focus().setCommentBlock({ name: '' }).deleteRange(range).run()
          },
        }
      },
      getToolboxItems({ editor }: { editor: Editor }) {
        return {
          priority: 60,
          component: markRaw(ToolboxItem),
          props: {
            editor,
            icon: markRaw(MdiCommentQuote),
            title: '添加评论引用',
            action: () => {
              editor.chain().focus().setCommentBlock({ name: '' }).run()
            },
          },
        }
      },
      getBubbleMenu({ editor }: { editor: Editor }) {
        return {
          pluginKey: 'comment-block-bubble-menu',
          shouldShow: ({ state }: { state: EditorState }) => {
            return isActive(state, CommentBlockExtension.name)
          },
          items: [
            {
              priority: 50,
              icon: markRaw(MdiDeleteForeverOutline),
              title: '删除',
              action: () => {
                return deleteNode(CommentBlockExtension.name, editor)
              },
            },
          ],
        }
      },
    }
  },
})

export default CommentBlockExtension
