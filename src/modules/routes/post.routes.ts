import { Router } from 'express';

import { authMiddleware } from '|/middlewares/auth.middleware';
import { paginationMiddleware } from '|/middlewares/pagination.middleware';

import { postController } from '../controllers/post.controller';
import { postValidation } from '../validations/post.validation';

export const postRoutes = Router();

postRoutes
  .get('/', paginationMiddleware(), postController.getPostList)
  .get('/p/:postId', postValidation.getPost, postController.getPost);
postRoutes
  .use(authMiddleware())
  .post('/', postValidation.createPost, postController.createPost)
  .patch('/p/:postId', postValidation.updatePost, postController.updatePost)
  .delete('/p/:postId', postValidation.deletePost, postController.deletePost)
  .patch('/p/:postId/publish', postValidation.publishPost, postController.publishPost)
  .post('/p/:postId/comments', postValidation.addPostComment, postController.addPostComment)
  .get('/p/:postId/comments', postValidation.getPostComments, postController.getPostComments);
