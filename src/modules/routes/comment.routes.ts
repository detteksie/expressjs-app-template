import { Router } from 'express';

import { authMiddleware } from '|/middlewares/auth.middleware';

import { commentController } from '../controllers/comment.controller';
import { commentValidation } from '../validations/comment.validation';

export const commentRoutes = Router();

commentRoutes
  .use(authMiddleware())
  .patch('/:commentId', commentValidation.updateComment, commentController.updateComment)
  .patch('/:commentId/hide', commentValidation.hideComment, commentController.hideComment)
  .delete('/:commentId', commentValidation.deleteComment, commentController.deleteComment);
