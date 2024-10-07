import { User } from './models/user.model';

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }

  function jsonStringify(obj: unknown, space?: number): string;
  function safewait<E extends Error = Error, T = unknown>(
    promise: Promise<T>,
  ): Promise<[T | null, E | null]>;
}
