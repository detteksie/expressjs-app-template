export interface CreatePostDto {
  title: string;
  content: string;
}

export interface UpdatePostDto {
  title?: string;
  content?: string;
}

export interface PublishPostDto {
  isPublished?: boolean;
}

export interface AddPostCommentDto {
  content: string;
}
