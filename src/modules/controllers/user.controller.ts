import expressAsyncHandler from 'express-async-handler';

import { PaginationQuery } from '|/utils/pagination-query.util';
import { successJson } from '|/utils/response.util';

import { UpdateUserDto } from '../dto/user.dto';
import { UserService, userService } from '../services/user.service';

type UserControllerId = { userId: string };

export class UserController {
  constructor(private readonly userService: UserService) {}

  getUserList = expressAsyncHandler<any, any, any, PaginationQuery>(async (req, res) => {
    console.log(req.url, 'req.url');
    console.log(req.baseUrl, 'req.baseUrl');
    console.log(req.originalUrl, 'req.originalUrl');
    const result = await this.userService.getUserList({
      limit: req.query.limit!,
      page: req.query.page!,
      route: req.originalUrl,
    });
    res.json(successJson(result));
  });

  getMe = expressAsyncHandler(async (req, res) => {
    const result = await this.userService.getUser(req.user?.id!);
    res.json(successJson(result));
  });

  getMyPosts = expressAsyncHandler(async (req, res) => {
    const result = await this.userService.getMyPost(req.user?.id!);
    res.json(successJson(result));
  });

  getMyComments = expressAsyncHandler(async (req, res) => {
    const result = await this.userService.getMyComments(req.user?.id!);
    res.json(successJson(result));
  });

  getUser = expressAsyncHandler<UserControllerId>(async (req, res) => {
    const result = await this.userService.getUser(parseInt(req.params.userId));
    res.json(successJson(result));
  });

  updateMe = expressAsyncHandler<any, any, UpdateUserDto>(async (req, res) => {
    await this.userService.updateUser(req.user?.id!, req.body);
    res.status(204).json();
  });
}

export const userController = new UserController(userService);
