'use strict';

const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const dt = new Date();

    /**
     * @type {{id: number; commentator_id: number; post_id: number; content: string; hidden: boolean; created_at: Date, updated_at: Date}[]}
     */
    const plainCommentsString = fs.readFileSync(
      path.join(__dirname, '20220220000002-comments.json'),
      'utf-8',
    );
    const plainComments = JSON.parse(plainCommentsString);
    const comments = plainComments.map((comment, idx) => {
      const date = new Date(dt.getTime() + idx);
      const modifiedComment = {
        ...comment,
        created_at: date,
        updated_at: date,
      };
      return modifiedComment;
    });
    await queryInterface.bulkInsert('comments', comments);
    await queryInterface.sequelize.query(`select setval('comments_id_seq', 1000);`);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('comments', null, {});
  },
};
