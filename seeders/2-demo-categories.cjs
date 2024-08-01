'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      { id: 1, name: 'moradia', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'alimentação', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'vestuário', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: 'transporte', createdAt: new Date(), updatedAt: new Date() },
      { id: 5, name: 'lazer', createdAt: new Date(), updatedAt: new Date() },
      { id: 6, name: 'outro', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
