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

export const commentApiClient = {

  /**
   * 分页获取评论
   */
  async listComments(page = 1, size = 20): Promise<{ data: CommentListResult }> {
    return axiosInstance.get(
      `/apis/api.comment.interact.xhhao.com/v1alpha1/allComments`,
      { params: { page, size } }
    )
  },

  async getCommentByName(name: string): Promise<{ data: CommentVo }> {
    return axiosInstance.get(
      `/apis/api.comment.interact.xhhao.com/v1alpha1/comments/${name}`
    )
  },
}
