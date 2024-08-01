'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Expenses', [
      {
        name: 'Fatura do Cartão',
        value: 700.75,
        userId: 1,
        category: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Conta de Luz',
        value: 250.00,
        userId: 1, 
        category: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Conta de Água',
        value: 120.50,
        userId: 1,
        category: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Compra do supermercado',
        value: 1400.50,
        userId: 2,
        category: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Expenses', null, {});
  }
};
