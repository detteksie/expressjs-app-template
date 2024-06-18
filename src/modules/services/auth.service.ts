import createHttpError from 'http-errors';
import { LoginDto, RegisterDto } from '~/modules/dto/auth.dto';
import { Sql, sql } from '~/infrastructures/sql';
import { comparePassword } from '~/utils/bcrypt.util';
import { createToken } from '~/utils/jwt.util';

export class AuthService {
  constructor(private readonly sql: Sql) {}

  private loginError() {
    throw createHttpError(400, 'Email or Password is invalid');
  }

  async findEmail(email: string) {
    const user = await this.sql.User.findOne({ where: { email } });
    if (user) throw createHttpError(409, 'Email already exist');
  }

  async register(RegisterDto: RegisterDto) {
    const { name, email, password, birthdate } = RegisterDto;
    await this.findEmail(email);
    const user = await this.sql.User.create({
      name,
      email,
      password,
      birthdate,
    });
    return user;
  }

  async login(loginRequest: LoginDto) {
    const { email, password } = loginRequest;
    const user = await this.sql.User.findOne({
      where: { email },
      attributes: { include: ['password'] },
    });
    if (!user) throw this.loginError();

    const passwordMatched = await comparePassword(password, user.password);
    if (!passwordMatched) throw this.loginError();

    const tokens = {
      tokenType: 'Bearer',
      accessToken: createToken(user),
      refreshToken: createToken(user, 'refresh'),
    };
    return tokens;
  }
}

export const authService = new AuthService(sql);
