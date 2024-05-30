'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    {
      name: 'Product 1',
      description: 'This is product 1',
      price: 10.99,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Product 2',
      description: 'This is product 2',
      price: 15.99,
      createdAt: new Date(),
      updatedAt: new Date()
  },
], {});
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.bulkDelete('People', null, {});
    
  }
};
