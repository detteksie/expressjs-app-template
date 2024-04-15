import { body, param } from 'express-validator';
import { validationMiddleware } from '~/middlewares/validation.middleware';

export class PostValidation {
  createPost = [
    body('title').isString().isLength({ max: 255 }),
    body('content').isString(),
    validationMiddleware,
  ];

  getPost = [param('postId').isNumeric({ no_symbols: true }), validationMiddleware];

  updatePost = [
    param('postId').isNumeric({ no_symbols: true }),
    body('title').isString().isLength({ max: 255 }).optional(),
    body('content').isString().optional(),
    validationMiddleware,
  ];

  publishPost = [
    param('postId').isNumeric({ no_symbols: true }),
    body('isPublished').isBoolean().optional(),
    validationMiddleware,
  ];

  deletePost = [param('postId').isNumeric({ no_symbols: true }), validationMiddleware];

  addPostComment = [
    param('postId').isNumeric({ no_symbols: true }),
    body('content').isString(),
    validationMiddleware,
  ];

  getPostComments = [param('postId').isNumeric({ no_symbols: true }), validationMiddleware];
}

export const postValidation = new PostValidation();
