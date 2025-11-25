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
          return { name: attributes.name }
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
        tag: 'comment-reference',
      },
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    const attrs = mergeAttributes(HTMLAttributes) as { name?: string }
    const rawNames = (node.attrs as any).names as string[] | null | undefined

    const names: string[] = Array.isArray(rawNames)
      ? rawNames
      : attrs.name
      ? [attrs.name]
      : []

    if (!names.length) {
      return ['comment-reference', {}]
    }

    const children: any[] = []
    names.forEach((n, index) => {
      if (index > 0) {
        children.push('br')
      }
      children.push(['comment-reference', { name: n }])
    })

    return ['div', {}, ...children]
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
              props: {
                icon: markRaw(MdiDeleteForeverOutline),
                title: '删除',
                action: ({ editor }: { editor: Editor }) => {
                  return deleteNode(CommentBlockExtension.name, editor)
                },
              },
            },
          ],
        }
      },
    }
  },
})

export default CommentBlockExtension
