import createHttpError from 'http-errors';
import { UpdateUserRequest } from '~/dto/user.request';
import { Sql, sql } from '~/infrastructures/sql';

export class UserService {
  constructor(private sql: Sql) {}

  async getUserList() {
    return this.sql.User.findAll();
  }

  async getUser(userId: number) {
    const user = await this.sql.User.findByPk(userId);
    if (!user) {
      throw createHttpError(404, 'User not found');
    }
    return user;
  }

  async getMyPost(userId: number) {
    const user = await this.sql.User.findByPk(userId, {
      include: [
        {
          model: this.sql.Post,
        },
      ],
    });
    if (!user) {
      throw createHttpError(404, 'User not found');
    }
    return user;
  }

  async getMyComments(userId: number) {
    const user = await this.sql.User.findByPk(userId, {
      include: [
        {
          model: this.sql.Comment,
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
    const updatedProfile = await this.sql.User.update(
      { name, birthdate },
      {
        where: { id: myUserId },
        returning: true,
      },
    );
    return updatedProfile;
  }
}

export const userService = new UserService(sql);
