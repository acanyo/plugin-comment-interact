import type { CommentData } from './comment-types';

export async function fetchCommentByName(name: string): Promise<CommentData | null> {
  const url = `/apis/api.comment.interact.xhhao.com/v1alpha1/comments/${encodeURIComponent(name)}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`获取评论失败: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();

  if (result.kind === 'Comment') {
    return result as CommentData;
  }

  if (result.data) {
    return result.data as CommentData;
  }

  return null;
}
