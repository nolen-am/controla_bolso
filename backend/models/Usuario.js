'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.hasMany(models.Categoria, {
        foreignKey: 'id_usuario',
        as: 'categorias',
      });
    }
  }

  Usuario.init(
    {
      id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome_usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isAlphanumeric: true,
        }
      },
      primeiro_nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ultimo_nome: {
        type: DataTypes.STRING,
        allowNull: false, 
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      nivel: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      modelName: 'Usuario',
      tableName: 'usuario',
      timestamps: false,
      hooks: {
        beforeCreate: async (usuario) => {
          usuario.senha = await bcrypt.hash(usuario.senha, 10);
        },
      },
    }
  );

  return Usuario;
};
