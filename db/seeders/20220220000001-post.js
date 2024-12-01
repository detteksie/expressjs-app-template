'use strict';

const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const dt = new Date();

    /**
     * @type {{id: number; author_id?: number; title: string; content: string; is_published?: boolean; created_at: Date; updated_at: Date}[]}
     */
    const plainPostsString = fs.readFileSync(
      path.join(__dirname, '20220220000001-post.json'),
      'utf-8',
    );
    const plainPosts = JSON.parse(plainPostsString);
    const posts = plainPosts.map((post, idx) => {
      const date = new Date(dt.getTime() + idx);
      const modifiedPost = {
        ...post,
        created_at: date,
        updated_at: date,
      };
      return modifiedPost;
    });
    await queryInterface.bulkInsert('posts', posts);
    await queryInterface.sequelize.query(`select setval('posts_id_seq', 1000);`);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('posts', null, {});
  },
};
