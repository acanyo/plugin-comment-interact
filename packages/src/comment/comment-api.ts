import type { CommentData } from './comment-types';

export async function fetchCommentByName(name: string): Promise<CommentData | null> {
  const url = `/apis/api.comment.interact.xhhao.com/v1alpha1/comments/${encodeURIComponent(name)}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`获取评论失败: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();

  if (result.kind === 'Comment' || result.kind === 'Reply') {
    return result as CommentData;
  }

  if (result && typeof result === 'object' && (result.content || result.raw)) {
    const data = result as CommentData;
    if (!data.name) data.name = data.metadataName || 'unknown';
    if (!data.displayName) data.displayName = '匿名用户';
    return data;
  }
  if (result.data) {
    return result.data as CommentData;
  }
  return null;
}

export interface CommentListParams {
  group: string;
  kind: string;
  name: string;
}

interface RawOwner {
  displayName: string;
  annotations?: Record<string, string>;
}

interface RawSpec {
  content: string;
  raw: string;
  owner: RawOwner;
  approved: boolean;
}

interface RawMetadata {
  name: string;
}

interface RawReply {
  metadata: RawMetadata;
  spec: RawSpec;
}

interface RawOwnerInfo {
  kind: string;
  name: string;
  displayName: string;
  avatar?: string;
  email?: string;
}

interface RawComment {
  metadata: RawMetadata;
  spec: RawSpec;
  owner?: RawOwnerInfo;
  replies?: {
    items: RawReply[];
  };
}

interface RawReply {
  metadata: RawMetadata;
  spec: RawSpec;
  owner?: RawOwnerInfo;
}

export async function fetchCommentList(params: CommentListParams): Promise<CommentData[]> {
  const searchParams = new URLSearchParams({
    group: params.group,
    kind: params.kind,
    name: params.name,
    size: '100',      // Default size
    replySize: '100'  // Default reply size
  });

  const url = `/apis/api.comment.interact.xhhao.com/v1alpha1/commentList?${searchParams.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`获取评论列表失败: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();

  const comments: CommentData[] = [];

  if (Array.isArray(result.items)) {
    const rawItems = result.items as RawComment[];

    for (const item of rawItems) {
      // Main comment
      comments.push(mapToCommentData(item));

      // Replies
      if (item.replies?.items) {
        for (const reply of item.replies.items) {
          comments.push(mapToCommentData(reply));
        }
      }
    }
  }

  return comments;
}

export interface CommentWithReplies {
  comment: CommentData;
  replies: CommentData[];
}

export async function fetchCommentWithReplies(name: string): Promise<CommentWithReplies | null> {
  const url = `/apis/api.comment.interact.xhhao.com/v1alpha1/comments/${encodeURIComponent(name)}/replies?replySize=100`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`获取评论回复失败: ${response.status} ${response.statusText}`);
  }

  const result = await response.json() as RawComment;

  const comment = mapToCommentData(result);
  const replies: CommentData[] = [];

  const commentMap = new Map<string, CommentData>();
  commentMap.set(comment.name, comment);

  if (result.replies?.items) {
    for (const reply of result.replies.items) {
      const replyData = mapToCommentData(reply);
      replies.push(replyData);
      commentMap.set(replyData.name, replyData);
    }
  }
  replies.forEach(reply => {
    let replyToName = '';
    if (reply.quoteReply) {
      const quotedComment = commentMap.get(reply.quoteReply);
      if (quotedComment) {
        replyToName = quotedComment.displayName;
      }
    }
    else if (reply.commentName) {
      const mainComment = commentMap.get(reply.commentName);
      if (mainComment) {
        replyToName = mainComment.displayName;
      }
    }
    if (replyToName) {
      const mentionHtml = `<span class="mention">@${replyToName}</span> `;
      if (reply.content.trim().startsWith('<p>')) {
        reply.content = reply.content.replace('<p>', `<p>${mentionHtml}`);
      } else {
        reply.content = mentionHtml + reply.content;
      }
    }
  });

  return {
    comment,
    replies
  };
}

function mapToCommentData(item: RawComment | RawReply): CommentData {
  const hash = item.spec.owner.annotations?.['email-hash'];
  return {
    kind: 'Comment',
    name: item.metadata.name,
    displayName: item.owner?.displayName || item.spec.owner.displayName,
    content: item.spec.content,
    raw: item.spec.raw,
    metadataName: item.metadata.name,
    approved: item.spec.approved,
    userAvatar: item.owner?.avatar || undefined,
    email: item.owner?.email || (item.spec.owner as any).email,
    emailHash: hash,
    quoteReply: (item.spec as any).quoteReply,
    commentName: (item.spec as any).commentName,
    creationTime: (item.spec as any).creationTime || (item.metadata as any).creationTimestamp
  };
}
