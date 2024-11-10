module.exports = (sequelize, DataTypes) => {
  const Subcategoria = sequelize.define('Subcategoria', {
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
      tableName: 'subcategoria',
      timestamps: false,
  });

  Subcategoria.associate = (models) => {
    Subcategoria.belongsTo(models.Categoria, {
      foreignKey: 'categoria_pai_id',
      onDelete: 'CASCADE',
    });
    Subcategoria.hasMany(models.Transacao, {
      foreignKey: 'subcategoria_id',
      onDelete: 'SET NULL',
    });
  };

  return Subcategoria;
};
