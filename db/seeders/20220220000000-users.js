'use strict';

const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const pswd = [
      '$2b$12$xP0fzZO33nCUzw1ooeWjTu9q3umymrh5h7LDKLBtJTSSdYpiEtCOS', // asdf1234
      '$2b$12$rIXjjcQn5QwFJ6iDHJTqDu4alG4gbdCi22xKs8tcaU4aQD4dpLBMu', // asdf1245
    ];
    const dt = new Date();

    /**
     * @type {{id: number; name: string; email: string; password: string; birthdate?: Date; created_at: Date; updated_at: Date}[]}
     */
    const plainUsersString = fs.readFileSync(
      path.join(__dirname, '20220220000000-users.json'),
      'utf-8',
    );
    const plainUsers = JSON.parse(plainUsersString);
    const users = plainUsers.map((user, idx) => {
      const password =
        idx === 0 ? pswd[0] : idx === 1 ? pswd[1] : pswd[Math.floor(Math.random()) * 2];
      const date = new Date(dt.getTime() + idx);
      const modifiedUser = {
        ...user,
        password,
        created_at: date,
        updated_at: date,
      };
      return modifiedUser;
    });
    await queryInterface.bulkInsert('users', users);
    await queryInterface.sequelize.query(`select setval('users_id_seq', 1000);`);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  },
};
