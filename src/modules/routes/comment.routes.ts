import { Router } from 'express';

import { authMiddleware } from '|/middlewares/auth.middleware';

import { commentController } from '../controllers/comment.controller';
import { commentValidation } from '../validations/comment.validation';

export const commentRoutes = Router();

commentRoutes
  .use(authMiddleware())
  .patch('/c/:commentId', commentValidation.updateComment, commentController.updateComment)
  .patch('/c/:commentId/hide', commentValidation.hideComment, commentController.hideComment)
  .delete('/c/:commentId', commentValidation.deleteComment, commentController.deleteComment);
