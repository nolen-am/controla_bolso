'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Alterando o relacionamento de id_recorrencia
    await queryInterface.changeColumn('transacao', 'id_recorrencia', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'recorrencia',
        key: 'id_recorrencia',
      },
      onDelete: 'SET NULL',
    });

    // Adicionar ou alterar o campo recorrente
    await queryInterface.changeColumn('transacao', 'recorrente', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('transacao', 'id_recorrencia', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'recorrencia',
        key: 'id_recorrencia',
      },
      onDelete: 'CASCADE',
    });

    await queryInterface.changeColumn('transacao', 'recorrente');
  },
};
