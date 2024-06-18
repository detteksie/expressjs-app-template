import expressAsyncHandler from 'express-async-handler';
import {
  AddPostCommentDto,
  CreatePostDto,
  PublishPostDto,
  UpdatePostDto,
} from '~/modules/dto/post.dto';
import { PostService, postService } from '~/modules/services/post.service';
import { PaginationQuery } from '~/utils/pagination-query.util';
import { successJson } from '~/utils/response.util';

type PostControllerId = {
  postId: string;
};

export class PostController {
  constructor(private readonly postService: PostService) {}

  createPost = expressAsyncHandler<any, any, CreatePostDto>(async (req, res) => {
    const result = await this.postService.createPost(req.user?.id!, req.body);
    res.status(201).json(successJson(result));
  });

  getPostList = expressAsyncHandler<any, any, any, PaginationQuery>(async (req, res) => {
    const result = await this.postService.getPostList({
      limit: req.query.limit!,
      page: req.query.page!,
      route: req.originalUrl,
    });
    res.json(successJson(result));
  });

  getPost = expressAsyncHandler<PostControllerId>(async (req, res) => {
    const result = await this.postService.getPost(parseInt(req.params.postId));
    res.json(successJson(result));
  });

  updatePost = expressAsyncHandler<PostControllerId, any, UpdatePostDto>(async (req, res) => {
    await this.postService.updatePost(req.user?.id!, parseInt(req.params.postId), req.body);
    res.status(204).json();
  });

  publishPost = expressAsyncHandler<PostControllerId, any, PublishPostDto>(async (req, res) => {
    await this.postService.publishPost(req.user?.id!, parseInt(req.params.postId), req.body);
    res.status(204).json();
  });

  deletePost = expressAsyncHandler<PostControllerId>(async (req, res) => {
    await this.postService.deletePost(req.user?.id!, parseInt(req.params.postId));
    res.status(204).json();
  });

  addPostComment = expressAsyncHandler<PostControllerId, any, AddPostCommentDto>(
    async (req, res) => {
      const result = await this.postService.addPostComment(
        req.user?.id!,
        parseInt(req.params.postId),
        req.body,
      );
      res.status(201).json(successJson(result));
    },
  );

  getPostComments = expressAsyncHandler<PostControllerId>(async (req, res) => {
    const result = await this.postService.getPostComments(parseInt(req.params.postId));
    res.json(successJson(result));
  });
}

export const postController = new PostController(postService);
