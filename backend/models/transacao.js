module.exports = (sequelize, DataTypes) => {
  const Transacao = sequelize.define('Transacao', {
      tipo: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              isIn: [['despesa', 'receita']],
          },
      },
      valor: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
      },
      data: {
          type: DataTypes.DATEONLY,
          allowNull: false,
      },
      descricao: {
          type: DataTypes.TEXT,
          allowNull: true,
      },
      recorrente: {
          type: DataTypes.BOOLEAN,
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
  }, {
      tableName: 'transacao',
      timestamps: false,
  });

  Transacao.associate = (models) => {
    Transacao.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id',
      onDelete: 'CASCADE',
    });
    Transacao.belongsTo(models.Categoria, {
      foreignKey: 'categoria_id',
      onDelete: 'SET NULL',
    });
    Transacao.belongsTo(models.Subcategoria, {
      foreignKey: 'subcategoria_id',
      onDelete: 'SET NULL',
    });
    Transacao.hasOne(models.ConfiguracaoRecorrencia, {
      foreignKey: 'transacao_id',
      onDelete: 'CASCADE',
    });
  };

  return Transacao;
};
