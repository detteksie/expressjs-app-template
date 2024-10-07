import { body, param } from 'express-validator';

import { validationMiddleware } from '|/middlewares/validation.middleware';

export class TodoValidation {
  createTodo = [
    body('task').isString().isLength({ max: 255 }),
    body('description').isString().optional(),
    body('dueDate').isISO8601().toDate().optional(),
    validationMiddleware(),
  ];

  getTodoId = [param('todoId').isMongoId(), validationMiddleware()];

  updateTodo = [
    body('task').isString().isLength({ max: 255 }).optional(),
    body('description').isString().optional(),
    body('done').isBoolean().optional(),
    body('dueDate').isISO8601().toDate().optional(),
    validationMiddleware(),
  ];
}

export const todoValidation = new TodoValidation();
