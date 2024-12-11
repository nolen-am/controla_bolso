'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('subcategoria', {
      id_subcategoria: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id_categoria: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categoria',
          key: 'id_categoria',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE', // Adicionado para consistência
      },
      nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
    await queryInterface.dropTable('subcategoria');
  },
};
