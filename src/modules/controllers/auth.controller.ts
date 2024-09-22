import expressAsyncHandler from 'express-async-handler';

import { successJson } from '|/utils/response.util';

import { LoginDto, RegisterDto } from '../dto/auth.dto';
import { AuthService, authService } from '../services/auth.service';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = expressAsyncHandler<unknown, unknown, RegisterDto>(async (req, res) => {
    const result = await this.authService.register(req.body);
    res.status(201).json(successJson(result));
  });

  login = expressAsyncHandler<unknown, unknown, LoginDto>(async (req, res) => {
    const tokens = await this.authService.login(req.body);
    res.json(successJson(tokens));
  });
}

export const authController = new AuthController(authService);
