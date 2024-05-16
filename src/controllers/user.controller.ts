import expressAsyncHandler from 'express-async-handler';
import { UpdateUserRequest } from '~/dto/user.request';
import { UserService, userService } from '~/services/user.service';
import { successJson } from '~/utils/response.helper';

type UserControllerId = { userId: string };

export class UserController {
  constructor(private readonly userService: UserService) {}

  getUserList = expressAsyncHandler(async (req, res) => {
    const users = await this.userService.getUserList();
    res.json(successJson(users));
  });

  getMe = expressAsyncHandler(async (req, res) => {
    const user = await this.userService.getUser(req.user?.id!);
    res.json(user);
  });

  getMyPosts = expressAsyncHandler(async (req, res) => {
    const user = await this.userService.getMyPost(req.user?.id!);
    res.json(user);
  });

  getMyComments = expressAsyncHandler(async (req, res) => {
    const user = await this.userService.getMyComments(req.user?.id!);
    res.json(user);
  });

  getUser = expressAsyncHandler<UserControllerId>(async (req, res) => {
    const user = await this.userService.getUser(parseInt(req.params.userId));
    res.json(user);
  });

  updateMe = expressAsyncHandler<any, any, UpdateUserRequest>(async (req, res) => {
    await this.userService.updateUser(req.user?.id!, req.body);
    res.status(204).json();
  });
}

export const userController = new UserController(userService);
