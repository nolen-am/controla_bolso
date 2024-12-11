'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuario', {
      id_usuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nome_usuario: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      primeiro_nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      ultimo_nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      senha: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      nivel: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      data_criacao: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      data_alteracao: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      data_exclusao: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuario');
  },
};
