'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Adicionando o campo "descricao" na tabela "categoria"
    await queryInterface.addColumn('subcategoria', 'descricao', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    // Removendo o campo 'descricao' caso seja necessário reverter a migração 
    await queryInterface.removeColumn('subcategoria', 'descricao');
  }
};
