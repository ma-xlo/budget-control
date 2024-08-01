'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      { name: 'moradia', createdAt: new Date(), updatedAt: new Date() },
      { name: 'alimentação', createdAt: new Date(), updatedAt: new Date() },
      { name: 'vestuário', createdAt: new Date(), updatedAt: new Date() },
      { name: 'transporte', createdAt: new Date(), updatedAt: new Date() },
      { name: 'lazer', createdAt: new Date(), updatedAt: new Date() },
      { name: 'outro', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
