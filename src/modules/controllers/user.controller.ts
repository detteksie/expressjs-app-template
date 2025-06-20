import expressAsyncHandler from 'express-async-handler';

import { PaginationQuery } from '@/utils/pagination-query.util';
import { successJson } from '@/utils/response.util';

import { UpdateUserDto } from '../dto/user.dto';
import { UserService, userService } from '../services/user.service';

type UserControllerId = { userId: string };

export class UserController {
  constructor(private readonly userService: UserService) {}

  getUserList = expressAsyncHandler<unknown, unknown, unknown, PaginationQuery>(
    async (req, res) => {
      const result = await this.userService.getUserList({
        limit: req.query.limit,
        page: req.query.page,
        route: req.originalUrl,
      });
      res.json(successJson(result));
    },
  );

  getMe = expressAsyncHandler((req, res) => {
    res.json(successJson(req.user));
  });

  getMyPosts = expressAsyncHandler(async (req, res) => {
    const result = await this.userService.getMyPost(req.user.id);
    res.json(successJson(result));
  });

  getMyComments = expressAsyncHandler(async (req, res) => {
    const result = await this.userService.getMyComments(req.user.id);
    res.json(successJson(result));
  });

  getUser = expressAsyncHandler<UserControllerId>(async (req, res) => {
    const result = await this.userService.getUser(parseInt(req.params.userId));
    res.json(successJson(result));
  });

  updateMe = expressAsyncHandler<unknown, unknown, UpdateUserDto>(async (req, res) => {
    await this.userService.updateUser(req.user.id, req.body);
    res.status(204).json();
  });
}

export const userController = new UserController(userService);
