import expressAsyncHandler from 'express-async-handler';
import { LoginDto, RegisterDto } from '~/modules/dto/auth.dto';
import { AuthService, authService } from '~/modules/services/auth.service';
import { successJson } from '~/utils/response.util';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = expressAsyncHandler<any, any, RegisterDto>(async (req, res) => {
    const result = await this.authService.register(req.body);
    res.status(201).json(successJson(result));
  });

  login = expressAsyncHandler<any, any, LoginDto>(async (req, res) => {
    const tokens = await this.authService.login(req.body);
    res.json(tokens);
  });
}

export const authController = new AuthController(authService);
