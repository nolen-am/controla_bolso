module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
      nome: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
      },
      senha: {
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
      tableName: 'usuario',
      timestamps: false,
  });

  return Usuario;
};
