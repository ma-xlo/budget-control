'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Expenses', [
      {
        name: 'Fatura do Cartão',
        value: 700.75,
        responsible: 1, // Ensure this user ID exists
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Conta de Luz',
        value: 250.00,
        responsible: 1, // Ensure this user ID exists
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Conta de Água',
        value: 120.50,
        responsible: 1, // Ensure this user ID exists
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more expense entries as needed
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Expenses', null, {});
  }
};
