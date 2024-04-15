import createHttpError from 'http-errors';
import { db } from '~/models';
import { UpdateUserRequest } from '~/dto/user.request';

export class UserService {
  constructor(private database: typeof db) {}

  async getUserList() {
    return this.database.User.findAll();
  }

  async getUser(userId: number) {
    const user = await this.database.User.findByPk(userId);
    if (!user) {
      throw createHttpError(404, 'User not found');
    }
    return user;
  }

  async getMyPost(userId: number) {
    const user = await this.database.User.findByPk(userId, {
      include: [
        {
          model: this.database.Post,
        },
      ],
    });
    if (!user) {
      throw createHttpError(404, 'User not found');
    }
    return user;
  }

  async getMyComments(userId: number) {
    const user = await this.database.User.findByPk(userId, {
      include: [
        {
          model: this.database.Comment,
        },
      ],
    });
    if (!user) {
      throw createHttpError(404, 'User not found');
    }
    return user;
  }

  async updateUser(myUserId: number, updateUserRequest: UpdateUserRequest) {
    const { name, birthdate } = updateUserRequest;
    const updatedProfile = await this.database.User.update(
      { name, birthdate },
      {
        where: { id: myUserId },
        returning: true,
      },
    );
    return updatedProfile;
  }
}

export const userService = new UserService(db);
