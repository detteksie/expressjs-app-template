import createHttpError from 'http-errors';

import { MongoDB, mongodb } from '|/infrastructures/mongodb';
import { User } from '|/models/user.model';
import { mongoosePaginate } from '|/utils/mongoose-paginate';
import { IPaginationOptions } from '|/utils/paginate';

import { CreateTodoDto, UpdateTodoDto } from '../dto/todo.dto';

export class TodoService {
  constructor(private readonly mongodb: MongoDB) {}

  async createTodo(user: User, createTodoDto: CreateTodoDto) {
    const newTodo = new this.mongodb.Todo({
      userId: user.id,
      task: createTodoDto.task,
      description: createTodoDto.description,
      dueDate: createTodoDto.dueDate,
    });
    await newTodo.save();
    return newTodo;
  }

  async getTodoList(user: User, options: IPaginationOptions) {
    const query = this.mongodb.Todo.find({ userId: user.id }).sort({ createdAt: -1 });
    const posts = await mongoosePaginate(query, options);
    return posts;
  }

  async getTodo(todoId: string) {
    const todo = await this.mongodb.Todo.findById(todoId);
    if (todo === null) {
      throw createHttpError(404, 'Todo not found');
    }
    return todo;
  }

  async updateTodo(todoId: string, updateTodoDto: UpdateTodoDto) {
    const { task, description, done, dueDate } = updateTodoDto;
    const updatedTodo = await this.mongodb.Todo.updateOne(
      { _id: todoId },
      { task, description, done, dueDate },
    );
    return updatedTodo;
  }

  async deleteTodo(todoId: string) {
    const deletedTodo = await this.mongodb.Todo.deleteOne({ _id: todoId });
    return deletedTodo;
  }
}

export const todoService = new TodoService(mongodb);
