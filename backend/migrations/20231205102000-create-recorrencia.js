'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('recorrencia', {
      id_recorrencia: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      recorrencia: {
        type: Sequelize.STRING(9),
        allowNull: false,
      },
      desc_recorrencia: {
        type: Sequelize.STRING(50),
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
      id_transacao: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'transacao',
          key: 'id_transacao',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      id_agendamento: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'agendamento',
          key: 'id_agendamento',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('recorrencia');
  },
};
