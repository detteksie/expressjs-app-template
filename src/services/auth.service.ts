import createHttpError from 'http-errors';
import { db } from '~/models';
import { comparePassword } from '~/utils/bcrypt.helper';
import { createToken } from '~/utils/jwt.helper';
import { LoginUserRequest, RegisterUserRequest } from '~/dto/auth.request';

export class AuthService {
  constructor(private readonly database: typeof db) {}

  private loginError() {
    throw createHttpError(400, 'Email or Password is invalid');
  }

  async findEmail(email: string) {
    const user = await this.database.User.findOne({ where: { email } });
    if (user) throw createHttpError(409, 'Email already exist');
  }

  async register(registerUserRequest: RegisterUserRequest) {
    const { name, email, password, birthdate } = registerUserRequest;
    await this.findEmail(email);
    const user = await this.database.User.create({
      name,
      email,
      password,
      birthdate,
    });
    return user;
  }

  async login(loginRequest: LoginUserRequest) {
    const { email, password } = loginRequest;
    const user = await this.database.User.findOne({
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

export const authService = new AuthService(db);
