import { Router } from 'express';

import { authMiddleware } from '|/middlewares/auth.middleware';
import { paginationMiddleware } from '|/middlewares/pagination.middleware';

import { todoController } from '../controllers/todo.controller';
import { todoValidation } from '../validations/todo.validation';

export const todoRoutes = Router();

todoRoutes
  .use(authMiddleware())
  .post('/', todoValidation.createTodo, todoController.createTodo)
  .get('/', paginationMiddleware(), todoController.getTodoList)
  .get('/t/:todoId', todoValidation.getTodoId, todoController.getTodo)
  .patch('/t/:todoId', todoValidation.getTodoId, todoController.updatedTodo)
  .delete('/t/:todoId', todoValidation.getTodoId, todoController.deleteTodo);
