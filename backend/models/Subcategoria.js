'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subcategoria extends Model {
    static associate(models) {
      // subcategoria pertence a uma categoria
      Subcategoria.belongsTo(models.Categoria, {
        foreignKey: 'id_categoria',
        as: 'categoria',
      });

      // subcategoria pode ter várias transações
      Subcategoria.hasMany(models.Transacao, {
        foreignKey: 'id_subcategoria',
        as: 'transacoes',
      });
    }
  }
  Subcategoria.init(
    {
      id_subcategoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Categoria',
          key: 'id_categoria',
        },
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
      data_alteracao: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Subcategoria',
      tableName: 'subcategoria',
      timestamps: false,
    },
  );
  
  return Subcategoria;
};
