module.exports = (sequelize, DataTypes) => {
  const Categoria = sequelize.define('Categoria', {
      nome: {
          type: DataTypes.STRING,
          allowNull: false,
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
  }, {
      tableName: 'categoria',
      timestamps: false,
  });

  Categoria.associate = (models) => {
    Categoria.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id',
      onDelete: 'CASCADE',
    });
    Categoria.hasMany(models.Subcategoria, {
      foreignKey: 'categoria_pai_id',
      onDelete: 'CASCADE',
    });
    Categoria.hasMany(models.Transacao, {
      foreignKey: 'categoria_id',
      onDelete: 'SET NULL',
    });
  };

  return Categoria;
};
