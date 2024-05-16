import createHttpError from 'http-errors';
import { LoginUserRequest, RegisterUserRequest } from '~/dto/auth.request';
import { Sql, sql } from '~/infrastructures/sql';
import { comparePassword } from '~/utils/bcrypt.helper';
import { createToken } from '~/utils/jwt.helper';

export class AuthService {
  constructor(private readonly sql: Sql) {}

  private loginError() {
    throw createHttpError(400, 'Email or Password is invalid');
  }

  async findEmail(email: string) {
    const user = await this.sql.User.findOne({ where: { email } });
    if (user) throw createHttpError(409, 'Email already exist');
  }

  async register(registerUserRequest: RegisterUserRequest) {
    const { name, email, password, birthdate } = registerUserRequest;
    await this.findEmail(email);
    const user = await this.sql.User.create({
      name,
      email,
      password,
      birthdate,
    });
    return user;
  }

  async login(loginRequest: LoginUserRequest) {
    const { email, password } = loginRequest;
    const user = await this.sql.User.findOne({
      where: { email },
      attributes: { include: ['password'] },
    });
    if (!user) throw this.loginError();

    const passwordMatched = await comparePassword(password, user.password);
    if (!passwordMatched) throw this.loginError();

    const accessToken = createToken(user);
    return accessToken;
  }
}

export const authService = new AuthService(sql);
