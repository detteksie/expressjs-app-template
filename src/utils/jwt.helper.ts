import { sign, verify } from 'jsonwebtoken';
import { User } from '~/models/user.model';

export const createToken = (user: User) => {
  const { password, ...usr } = user.toJSON();
  const payload = { sub: usr.id };
  const token = sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.NODE_ENV === 'production' ? '30d' : '1h',
  });
  return token;
};

export const verifyToken = (token: string) => {
  const payload = verify(token, process.env.JWT_SECRET!);
  return payload;
};
