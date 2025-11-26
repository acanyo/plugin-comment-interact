export interface ExtensionRef {
  group: string;
  version: string;
  kind: string;
  name: string;
}

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
  ref?: ExtensionRef;
  refPost?: string;
  refUrl?: string;
  type?: string;
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
