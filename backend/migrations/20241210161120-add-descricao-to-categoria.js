'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Adicionando o campo "descricao" na tabela "categoria"
    await queryInterface.addColumn('categoria', 'descricao', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    // Remover o campo 'descricao' caso seja necessário reverter
    await queryInterface.removeColumn('categoria', 'descricao');
  }
};
