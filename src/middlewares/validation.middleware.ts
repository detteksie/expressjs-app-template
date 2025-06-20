import expressAsyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';

export const validationMiddleware = () =>
  expressAsyncHandler((req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({
        status: 'error',
        errors: errors.array(),
      });
      return;
    }
    next();
  });
