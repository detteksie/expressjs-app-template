import mongoose from 'mongoose';

// interface ITodo {
//   userId: number;
//   task: string;
//   description?: string;
//   done: boolean;
// }

const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
    },
    task: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    done: {
      type: Boolean,
      required: true,
      default: false,
    },
    dueDate: {
      type: Date,
      required: true,
      default: () => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        return date;
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export type ITodo = mongoose.InferSchemaType<typeof todoSchema>;

export const TodoModel = mongoose.model<ITodo>('Todo', todoSchema);
