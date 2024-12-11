'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transacao', {
      id_transacao: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        references: {
          model: 'usuario',
          key: 'id_usuario',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      id_categoria: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categoria',
          key: 'id_categoria',
        },
        allowNull: false,
      },
      id_subcategoria: {
        type: Sequelize.INTEGER,
        references: {
          model: 'subcategoria',
          key: 'id_subcategoria',
        },
        allowNull: false,
      },
      id_recorrencia: {
        type: Sequelize.INTEGER,
        references: {
          model: 'recorrencia',
          key: 'id_recorrencia',
        },
        allowNull: true,
      },
      tipo: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
          isIn: [['1', '2', '3']],
        },
      },
      valor: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      data: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      recorrente: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable('transacao');
  },
};
