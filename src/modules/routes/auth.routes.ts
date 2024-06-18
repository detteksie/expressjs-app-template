import { Router } from 'express';
import { authController } from '~/modules/controllers/auth.controller';
import { authValidation } from '~/modules/validations/auth.validation';

export const authRoutes = Router();

authRoutes.post('/register', authValidation.register, authController.register);
authRoutes.post('/login', authValidation.login, authController.login);
