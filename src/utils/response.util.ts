import { Request } from 'express';

export interface SuccessJson<T = unknown> {
  status: string;
  result: T;
}

export function successJson<T>(data: T): SuccessJson<T> {
  return {
    status: 'success',
    result: data,
  };
}

export function errorJson<T extends Error>(req: Request, err: T) {
  return {
    status: 'error',
    name: err.name,
    message: err.message,
    ...(req.app.get('env') === 'development' ? { stack: err.stack } : {}),
  };
}
