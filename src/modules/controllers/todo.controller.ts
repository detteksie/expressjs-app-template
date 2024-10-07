import expressAsyncHandler from 'express-async-handler';

import { PaginationQuery } from '|/utils/pagination-query.util';
import { successJson } from '|/utils/response.util';

import { CreateTodoDto, UpdateTodoDto } from '../dto/todo.dto';
import { TodoService, todoService } from '../services/todo.service';

type TodoControllerId = {
  todoId: string;
};

export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  createTodo = expressAsyncHandler<unknown, unknown, CreateTodoDto>(async (req, res) => {
    const result = await this.todoService.createTodo(req.user, req.body);
    res.status(201).json(successJson(result));
  });

  getTodoList = expressAsyncHandler<unknown, unknown, unknown, PaginationQuery>(
    async (req, res) => {
      const result = await this.todoService.getTodoList(req.user, {
        limit: req.query.limit!,
        page: req.query.page!,
        route: req.originalUrl,
      });
      res.json(successJson(result));
    },
  );

  getTodo = expressAsyncHandler<TodoControllerId>(async (req, res) => {
    const result = await this.todoService.getTodo(req.params.todoId);
    res.json(successJson(result));
  });

  updatedTodo = expressAsyncHandler<TodoControllerId, unknown, UpdateTodoDto>(async (req, res) => {
    await this.todoService.updateTodo(req.params.todoId, req.body);
    res.status(204).json();
  });

  deleteTodo = expressAsyncHandler<TodoControllerId>(async (req, res) => {
    await this.todoService.deleteTodo(req.params.todoId);
    res.status(204).json();
  });
}

export const todoController = new TodoController(todoService);
