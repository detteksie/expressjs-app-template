import expressAsyncHandler from 'express-async-handler';
import createHttpError from 'http-errors';
import { JwtPayload } from 'jsonwebtoken';

import { sql } from '|/infrastructures/sql';
import { User } from '|/models/user.model';
import { verifyToken } from '|/utils/jwt.util';

export const authMiddleware = (isSearch: boolean = false) =>
  expressAsyncHandler(async (req, res, next) => {
    const token = req.header('authorization')?.replace('Bearer ', '');
    if (!token) {
      throw createHttpError(401);
    }

    const payload = verifyToken(token) as JwtPayload;

    let user: null | { id: string | undefined } | User = null;
    if (isSearch) {
      user = await sql.User.findByPk(payload.sub);
    } else {
      user = { id: payload.sub };
    }
    // @ts-expect-error nothing
    req.user = user;

    next();
  });
