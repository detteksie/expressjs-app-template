import { Router } from 'express';
import { commentController } from '~/controllers/comment.controller';
import { authMiddlware } from '~/middlewares/auth.middleware';
import { commentValidation } from '~/validations/comment.validation';

export const commentRoutes = Router();

commentRoutes
  .use(authMiddlware)
  .patch('/:commentId', commentValidation.updateComment, commentController.updateComment)
  .patch('/:commentId/hide', commentValidation.hideComment, commentController.hideComment)
  .delete('/:commentId', commentValidation.deleteComment, commentController.deleteComment);
