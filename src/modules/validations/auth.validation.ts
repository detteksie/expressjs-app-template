import { body } from 'express-validator';
import { validationMiddleware } from '~/middlewares/validation.middleware';

export class AuthValidation {
  register = [
    body('name').isString().isLength({ max: 255 }),
    body('email').isEmail().normalizeEmail(),
    body('password').isString().isLength({ min: 8, max: 32 }),
    body('birthdate').isDate().optional(),
    validationMiddleware,
  ];

  login = [
    body('email').isEmail().normalizeEmail(),
    body('password').isString().isLength({ min: 8, max: 32 }),
    validationMiddleware,
  ];
}

export const authValidation = new AuthValidation();
