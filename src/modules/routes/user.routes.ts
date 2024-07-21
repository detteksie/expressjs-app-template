import { Router } from 'express';

import { authMiddleware } from '|/middlewares/auth.middleware';
import { paginationMiddleware } from '|/middlewares/pagination.middleware';

import { userController } from '../controllers/user.controller';
import { userValidation } from '../validations/user.validation';

export const userRoutes = Router();

/* GET users listing. */
userRoutes.get('/', paginationMiddleware(), userController.getUserList);
userRoutes.get('/me', authMiddleware(), userController.getMe);
userRoutes.get('/me/posts', authMiddleware(), userController.getMyPosts);
userRoutes.get('/me/comments', authMiddleware(), userController.getMyComments);
userRoutes.get('/:userId', userValidation.getUser, userController.getUser);
userRoutes.patch('/me', authMiddleware(), userValidation.updateMe, userController.updateMe);
