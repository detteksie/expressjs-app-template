export type CreatePostDto = {
  title: string;
  content: string;
};

export type UpdatePostDto = {
  title?: string;
  content?: string;
};

export type PublishPostDto = {
  isPublished?: boolean;
};

export type AddPostCommentDto = {
  content: string;
};
