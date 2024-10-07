export type CreateTodoDto = {
  task: string;
  description?: string;
  dueDate?: Date;
};

export type UpdateTodoDto = {
  task?: string;
  description?: string;
  done?: boolean;
  dueDate?: Date;
};
