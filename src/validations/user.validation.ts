import { body, param } from 'express-validator';
import { validationMiddleware } from '~/middlewares/validation.middleware';

export class UserValidation {
  createUser = [
    body('name').isString().isLength({ max: 255 }),
    body('email').isEmail().normalizeEmail(),
    body('password').isString().isLength({ min: 8, max: 32 }),
    body('birthdate').isDate().optional(),
    validationMiddleware,
  ];

  getUser = [param('userId'), validationMiddleware];

  updateMe = [
    body('name').isString().isLength({ max: 255 }),
    body('birthdate').isDate().optional(),
    validationMiddleware,
  ];
}

export const userValidation = new UserValidation();
