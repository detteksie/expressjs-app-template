export interface CreatePostRequest {
  title: string;
  content: string;
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
}

export interface PublishPostRequest {
  isPublished?: boolean;
}

export interface AddPostCommentRequest {
  content: string;
}
