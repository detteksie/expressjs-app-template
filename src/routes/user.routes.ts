import { Router } from 'express';
import { userController } from '~/controllers/user.controller';
import { authMiddlware } from '~/middlewares/auth.middleware';
import { userValidation } from '~/validations/user.validation';

export const userRoutes = Router();

/* GET users listing. */
userRoutes.get('/', userController.getUserList);
userRoutes.get('/me', authMiddlware, userController.getMe);
userRoutes.get('/me/posts', authMiddlware, userController.getMyPosts);
userRoutes.get('/me/comments', authMiddlware, userController.getMyComments);
userRoutes.get('/:userId', userValidation.getUser, userController.getUser);
userRoutes.patch('/me', authMiddlware, userValidation.updateMe, userController.updateMe);
