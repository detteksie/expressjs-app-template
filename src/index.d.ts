/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */
import { User } from './models/user.model';
import { Safewait } from './utils/safewait';

declare global {
  type Any = any;

  namespace Express {
    interface Request {
      user: User;
    }
  }

  var jsonStringify: JsonStringify;

  var safewait: Safewait;
}
