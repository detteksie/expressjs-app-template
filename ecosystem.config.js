/** @type {import('sequelize-cli').Migration} */
const config = {
  apps: [
    {
      name: 'expressjs-app-template',
      script: '.',
      max_memory_restart: '1G',
      interpreter: './node',
    },
  ],
};
module.exports = config;
