import Sequelize from 'sequelize';
import databaseConfig from '~/config/database.config';
import { Comment, commentModel } from './comment.model';
import { Post, postModel } from './post.model';
import { User, userModel } from './user.model';

const env = process.env.NODE_ENV! || 'development';
const config = databaseConfig[env as keyof typeof databaseConfig];

export type Models = {
  User: typeof User;
  Post: typeof Post;
  Comment: typeof Comment;
};
type ModelsKeys = keyof Models;

let sequelize: Sequelize.Sequelize = config.url
  ? new Sequelize.Sequelize(config.url as string, config)
  : new Sequelize.Sequelize(config.database!, config.username!, config.password, config);

const models: Models = {
  User: userModel(sequelize, Sequelize.DataTypes),
  Post: postModel(sequelize, Sequelize.DataTypes),
  Comment: commentModel(sequelize, Sequelize.DataTypes),
};

Object.keys(models).forEach((modelName) => {
  if (!!models[modelName as ModelsKeys].associate) {
    models[modelName as ModelsKeys].associate(models);
  }
});

export const db = {
  ...models,
  sequelize,
  Sequelize,
};
