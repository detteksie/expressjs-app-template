import mongoose from 'mongoose';

import { debug } from '|/bin/debug';
import { ITodo, TodoModel } from '|/schemas/todo.schema';

export class Schemas {
  readonly Todo!: mongoose.Model<ITodo>;

  constructor(todo: mongoose.Model<ITodo>) {
    this.Todo = todo;
  }
}

export const schemas = new Schemas(TodoModel);

export class MongoDB extends Schemas {
  readonly mongoose!: mongoose.Mongoose;

  constructor(schemas: Schemas, m: mongoose.Mongoose) {
    super(schemas.Todo);
    this.mongoose = m;
  }

  async connect() {
    if (process.env.NODE_ENV === 'development') {
      this.mongoose.set('debug', true);
    }
    const [, err] = await safewait(this.mongoose.connect(process.env.MONGODB_URI!));
    if (err && process.env.NODE_ENV !== 'test') {
      console.error('Unable to connect to MongoDB:', err.message);
      const sto = setTimeout(() => {
        console.log('reconnecting');
        this.connect();
        clearTimeout(sto);
      }, 10000);
      return;
    }
    debug('MongoDB Connection has been established successfully.');
  }

  async disconnect() {
    const [, err] = await safewait(this.mongoose.disconnect());
    if (err && process.env.NODE_ENV !== 'test') {
      console.error('Unable to disconnect MongoDB:', err.message);
      const sto = setTimeout(() => {
        this.disconnect();
        clearTimeout(sto);
      }, 10000);
      return;
    }
    debug('MongoDB has been disconnected.');
  }
}

export const mongodb = new MongoDB(schemas, mongoose);
