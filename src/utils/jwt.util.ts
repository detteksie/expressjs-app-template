import { sign, verify } from 'jsonwebtoken';
import { User } from '~/models/user.model';

export const createToken = (user: User, tokenType: 'access' | 'refresh' = 'access') => {
  const { password, ...usr } = user.toJSON();
  const payload = { sub: usr.id };
  const token = sign(
    payload,
    tokenType === 'refresh' ? process.env.JWT_REFRESH_SECRET! : process.env.JWT_ACCESS_SECRET!,
    {
      expiresIn:
        process.env.NODE_ENV === 'production'
          ? process.env.JWT_REFRESH_SECRET!
            ? '30d'
            : '1d'
          : process.env.JWT_REFRESH_SECRET!
            ? '1d'
            : '1h',
    },
  );
  return token;
};

export const verifyToken = (token: string, tokenType: 'access' | 'refresh' = 'access') => {
  const payload = verify(
    token,
    tokenType === 'refresh' ? process.env.JWT_REFRESH_SECRET! : process.env.JWT_ACCESS_SECRET!,
  );
  return payload;
};
