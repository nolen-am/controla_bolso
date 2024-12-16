'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Recorrencia extends Model {
    static associate(models) {
      // recorrência pode ter várias transações
      Recorrencia.hasMany(models.Transacao, {
        foreignKey: 'id_recorrencia',
        as: 'transacoes'
      });

      // recorrência pode ter vários agendamentos
      Recorrencia.hasMany(models.Agendamento, {
        foreignKey: 'id_recorrencia',
        as: 'agendamentos',
      });
    }
  }
  Recorrencia.init(
    {
      id_recorrencia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      recorrencia: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      desc_recorrencia: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
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
      modelName: 'Recorrencia',
      tableName: 'recorrencia',
      timestamps: false,
    }
  );
  
  return Recorrencia;
};
