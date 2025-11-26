import { axiosInstance } from '@halo-dev/api-client'

export interface CommentVo {
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
  // Halo 原生 API 字段
  comment?: {
    metadata: {
      name: string
    }
    spec: {
      raw: string
      content: string
      owner: {
        kind: string
        name: string
        displayName: string
      }
      creationTime: string
      approved: boolean
    }
  }
  owner?: {
    displayName: string
    email?: string
  }
}

export interface CommentListResult {
  page: number
  size: number
  total: number
  items: CommentVo[]
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
  first: boolean
  last: boolean
}

// 数据转换函数：将 Halo 原生格式转换为统一格式
function normalizeHaloComment(item: any): CommentVo {
  if (item.comment) {
    // Halo 原生格式
    return {
      kind: item.comment.kind || 'Comment',
      name: item.comment.metadata.name,
      email: item.owner?.email || '',
      displayName: item.comment.spec.owner.displayName || item.owner?.displayName || '',
      content: item.comment.spec.content || '',
      raw: item.comment.spec.raw || '',
      metadataName: item.comment.metadata.name,
      commentName: item.comment.metadata.name,
      userAvatar: '', // Halo 原生 API 不直接提供头像，需要根据 email 生成
      approved: item.comment.spec.approved || false,
      type: 'halo',
      comment: item.comment,
      owner: item.owner
    }
  }
  // 自定义格式，直接返回
  return item as CommentVo
}

export const commentApiClient = {

  /**
   * 分页获取评论（自定义接口，包含更多关联信息）
   */
  async listComments(page = 1, size = 20, keyword?: string): Promise<{ data: CommentListResult }> {
    return axiosInstance.get(
      `/apis/api.comment.interact.xhhao.com/v1alpha1/allComments`,
      { params: { page, size, keyword } }
    )
  },

  /**
   * 分页获取评论（Halo 原生接口）
   */
  async listHaloComments(page = 1, size = 20, keyword?: string): Promise<{ data: CommentListResult }> {
    const response = await axiosInstance.get(
      `/apis/api.console.halo.run/v1alpha1/comments`,
      { params: { page, size, keyword } }
    )

    // 转换数据格式
    if (response.data && response.data.items) {
      response.data.items = response.data.items.map(normalizeHaloComment)
    }

    return response
  },

  async getCommentByName(name: string): Promise<{ data: CommentVo }> {
    return axiosInstance.get(
      `/apis/api.comment.interact.xhhao.com/v1alpha1/comments/${name}`
    )
  },
}
