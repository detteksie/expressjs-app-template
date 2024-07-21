import { body, param } from 'express-validator';

import { validationMiddleware } from '|/middlewares/validation.middleware';

export class CommentValidation {
  updateComment = [
    param('commentId').isNumeric({ no_symbols: true }),
    body('content').isString().optional(),
    validationMiddleware(),
  ];

  hideComment = [
    param('commentId').isNumeric({ no_symbols: true }),
    body('hidden').isBoolean().optional(),
    validationMiddleware(),
  ];

  deleteComment = [param('commentId').isNumeric({ no_symbols: true }), validationMiddleware()];
}

export const commentValidation = new CommentValidation();
