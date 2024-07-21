import { Router } from 'express';

import { authMiddleware } from '|/middlewares/auth.middleware';
import { paginationMiddleware } from '|/middlewares/pagination.middleware';

import { postController } from '../controllers/post.controller';
import { postValidation } from '../validations/post.validation';

export const postRoutes = Router();

postRoutes
  .get('/', paginationMiddleware(), postController.getPostList)
  .get('/:postId', postValidation.getPost, postController.getPost);
postRoutes
  .use(authMiddleware())
  .post('/', postValidation.createPost, postController.createPost)
  .post('/:postId/comments', postValidation.addPostComment, postController.addPostComment)
  .get('/:postId/comments', postValidation.getPostComments, postController.getPostComments)
  .patch('/:postId', postValidation.updatePost, postController.updatePost)
  .patch('/:postId/publish', postValidation.publishPost, postController.publishPost)
  .delete('/:postId', postValidation.deletePost, postController.deletePost);
