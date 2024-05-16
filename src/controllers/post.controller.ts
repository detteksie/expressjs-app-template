import expressAsyncHandler from 'express-async-handler';
import {
  AddPostCommentRequest,
  CreatePostRequest,
  PublishPostRequest,
  UpdatePostRequest,
} from '~/dto/post.request';
import { PostService, postService } from '~/services/post.service';
import { successJson } from '~/utils/response.helper';

type PostControllerId = {
  postId: string;
};

export class PostController {
  constructor(private readonly postService: PostService) {}

  createPost = expressAsyncHandler<any, any, CreatePostRequest>(async (req, res) => {
    const newPost = await this.postService.createPost(req.user?.id!, req.body);
    res.status(201).json(newPost);
  });

  getPostList = expressAsyncHandler(async (req, res) => {
    const posts = await this.postService.getPostList();
    res.json(successJson(posts));
  });

  getPost = expressAsyncHandler<PostControllerId>(async (req, res) => {
    const post = await this.postService.getPost(parseInt(req.params.postId));
    res.json(post);
  });

  updatePost = expressAsyncHandler<PostControllerId, any, UpdatePostRequest>(async (req, res) => {
    await this.postService.updatePost(req.user?.id!, parseInt(req.params.postId), req.body);
    res.status(204).json();
  });

  publishPost = expressAsyncHandler<PostControllerId, any, PublishPostRequest>(async (req, res) => {
    await this.postService.publishPost(req.user?.id!, parseInt(req.params.postId), req.body);
    res.status(204).json();
  });

  deletePost = expressAsyncHandler<PostControllerId>(async (req, res) => {
    await this.postService.deletePost(req.user?.id!, parseInt(req.params.postId));
    res.status(204).json();
  });

  addPostComment = expressAsyncHandler<PostControllerId, any, AddPostCommentRequest>(
    async (req, res) => {
      const addedComment = await this.postService.addPostComment(
        req.user?.id!,
        parseInt(req.params.postId),
        req.body,
      );
      res.status(201).json(addedComment);
    },
  );

  getPostComments = expressAsyncHandler<PostControllerId>(async (req, res) => {
    const postComments = await this.postService.getPostComments(parseInt(req.params.postId));
    res.json(successJson(postComments));
  });
}

export const postController = new PostController(postService);
