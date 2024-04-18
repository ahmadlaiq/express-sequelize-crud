'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
      id: 1,
      name: 'John Doe',
      description: 'This is John Doe',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      name: 'Jane Doe',
      description: 'This is Jane Doe',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      name: 'John Smith',
      description: 'This is John Smith',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 4,
      name: 'Jane Smith',
      description: 'This is Jane Smith',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};