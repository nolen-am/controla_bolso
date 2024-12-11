'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Agendamento extends Model {
    static associate(models) {
      // agendamento percente a uma transação
      Agendamento.belongsTo(models.Transacao, {
        foreignKey: 'id_transacao',
        as: 'transacao',
      });

      // agendamento pertence a uma recorrência
      Agendamento.belongsTo(models.Recorrencia, {
        foreignKey: 'id_recorrencia',
        as: 'recorrencia',
      });
    }
  }
  Agendamento.init(
    {
      descricao_agendamento: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status_agendamento: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      data_criacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      data_alteracao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      data_exclusao: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Agendamento',
      tableName: 'agendamento',
      timestamps: false
    }
  );

  return Agendamento;
};
