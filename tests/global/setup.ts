import { Config } from 'jest';

import { mongodbSetup, mongodbTeardown } from './mongodb-setup';
import { sequelizeSetup, sequelizeTeardown } from './sequelize-setup';

async function globalSetup(_globalConfig: Config, _projectConfig: Config) {
  try {
    await sequelizeSetup();
    await mongodbSetup();
  } catch (err) {
    if (err) {
      await sequelizeTeardown();
      await mongodbTeardown();

      throw err;
    }
  }
}

export default globalSetup;
