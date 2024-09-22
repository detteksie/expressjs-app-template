import { sign, verify } from 'jsonwebtoken';

import { User } from '|/models/user.model';

export const createToken = (user: User, tokenType: 'access' | 'refresh' = 'access') => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    password,
    ...usr
  } = user.toJSON();
  const payload = {
    sub: usr.id,
    username: usr.username,
    email: usr.email,
  };

  let expiresIn = '30m';
  if (process.env.NODE_ENV === 'production') {
    if (tokenType === 'refresh') expiresIn = '30d';
    else if (tokenType === 'access') expiresIn = '1d';
  } else {
    if (tokenType === 'refresh') expiresIn = '1d';
    else if (tokenType === 'access') expiresIn = '1h';
  }

  const token = sign(
    payload,
    tokenType === 'refresh' ? process.env.JWT_REFRESH_SECRET! : process.env.JWT_ACCESS_SECRET!,
    { expiresIn },
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
