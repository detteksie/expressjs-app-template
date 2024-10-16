/**
 * @typedef {({url?: string} & import("sequelize").Options)} Options
 */
/**
 * @typedef DatabaseConfig
 * @type {Object}
 * @property {Options} development
 * @property {Options} test
 * @property {Options} production
 */

/**
 * @type {DatabaseConfig}
 */
const databaseConfig = {
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

module.exports = databaseConfig;
