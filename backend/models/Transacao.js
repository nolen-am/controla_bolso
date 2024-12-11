'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transacao extends Model {
    static associate(models) {
      // transação pertence a um usuário
      Transacao.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario',
        as: 'usuario',
      });

      // transação pertence a uma categoria
      Transacao.belongsTo(models.Categoria, {
        foreignKey: 'id_categoria',
        as: 'categoria',
      });

      // transacao pertence a uma subcategoria
      Transacao.belongsTo(models.Subcategoria, {
        foreignKey: 'id_subcategoria',
        as: 'subcategoria',
      });

      // transacao pode ter uma recorrencia
      Transacao.belongsTo(models.Recorrencia, {
        foreignKey: 'id_recorrencia',
        as: 'recorrencia',
      });
    }
  }

  Transacao.init({
    id_transacao: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuario',
        key: 'id_usuario',
      },
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categoria',
        key: 'id_categoria',
      },
    },
    id_subcategoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Subcategoria',
        key: 'id_subcategoria',
      },
    },
    id_recorrencia: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Recorrencia',
        key: 'id_recorrencia',
      },
      onDelete: 'SET NULL', // Para manter a transação mesmo se a recorrência for excluída
    },
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [[1, 2, 3]], // 1: Entrada, 2: Saída, 3: Investimento
      },
    },
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    recorrente: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    modelName: 'Transacao',
    tableName: 'transacao',
    timestamps: false,
  }
);
  
  return Transacao;
};
