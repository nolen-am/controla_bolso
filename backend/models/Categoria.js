'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    static associate(models) {
      // Categoria pertence a um usuário
      Categoria.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario',
        as: 'usuario',
      });

      // Categoria pode ter várias subcategorias
      Categoria.hasMany(models.Subcategoria, {
        foreignKey: 'id_categoria',
        as: 'subcategorias',
      });

      // Categoria pode ter várias transações
      Categoria.hasMany(models.Transacao, {
        foreignKey: 'id_categoria',
        as: 'transacoes',
      });
    }
  }

  Categoria.init(
    {
      id_categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 100],
        },
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuario',
          key: 'id_usuario',
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
      data_exclusao: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Categoria',
      tableName: 'categoria',
      timestamps: false,
    },
  );

  return Categoria;
};
