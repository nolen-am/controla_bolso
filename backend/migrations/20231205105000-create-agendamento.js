'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('agendamento', {
      id_agendamento: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id_transacao: {
        type: Sequelize.INTEGER,
        references: {
          model: 'transacao',
          key: 'id_transacao',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      id_recorrencia: {
        type: Sequelize.INTEGER,
        references: {
          model: 'recorrencia',
          key: 'id_recorrencia',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      descricao_agendamento: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },
      status_agendamento: {
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
    await queryInterface.dropTable('agendamento');
  },
};
