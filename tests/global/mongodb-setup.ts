import { mongodb } from '|/infrastructures/mongodb';
import mongodbTodoJson from '|db/mongodb/todo.json';

export const mongodbSetup = async () => {
  await mongodb.connect();
  const data = mongodbTodoJson.map((todo) => {
    return new mongodb.Todo({
      _id: todo._id,
      userId: todo.userId,
      task: todo.task,
      dueDate: todo.dueDate,
    });
  });
  await mongodb.Todo.insertMany(data);
};

export const mongodbTeardown = async () => {
  await mongodb.mongoose.connection.dropDatabase();
  await mongodb.disconnect();
};
