'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert('Users', [
        {
          id: 1,
          firstName: "Marcelo",
          lastName: "Correa",
          email: "macorrea@example.com",
          cpf: "23423124234",
          role:"Programador",
          password:"12345",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          firstName: "Matheus",
          lastName: "Henrique",
          email: "matheus@example.com",
          cpf: "123567456",
          role:"Programador",
          password:"54321",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
    } catch (error) {
      console.error('Error during bulk insert:', error);
    }

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
