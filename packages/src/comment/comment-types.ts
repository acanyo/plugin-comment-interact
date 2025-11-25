export interface CommentData {
  kind: string;
  name: string;
  email?: string;
  displayName: string;
  content: string;
  raw: string;
  metadataName: string;
  commentName?: string;
  userAvatar?: string;
  approved: boolean;
}

export interface CommentApiResponse {
  data?: CommentData;
  error?: string;
}

export interface ListResult<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  hasNext: boolean;
  hasPrevious: boolean;
  totalPages: number;
}
