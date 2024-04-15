import { Options } from 'sequelize';

interface SequelizeOptions extends Options {
  url?: string;
}

interface DatabaseConfig {
  development: SequelizeOptions;
  test: SequelizeOptions;
  production: SequelizeOptions;
}

const databaseConfig: DatabaseConfig = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: console.log,
  },
  test: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false,
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false,
    pool: {
      min: 1,
      max: 5,
    },
  },
};

export default databaseConfig;
