import Sequelize from 'sequelize';

interface Options extends Sequelize.Options {
  url?: string;
}

interface DatabaseConfig {
  development: Options;
  test: Options;
  production: Options;
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
