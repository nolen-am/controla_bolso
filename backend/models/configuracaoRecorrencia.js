module.exports = (sequelize, DataTypes) => {
  const ConfiguracaoRecorrencia = sequelize.define('ConfiguracaoRecorrencia', {
      frequencia: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              isIn: [['diária', 'semanal', 'mensal']],
          },
      },
      prox_execucao: {
          type: DataTypes.DATEONLY,
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
  }, {
      tableName: 'configuracao_recorrencia',
      timestamps: false,
  });

  ConfiguracaoRecorrencia.associate = (models) => {
    ConfiguracaoRecorrencia.belongsTo(models.Transacao, {
      foreignKey: 'transacao_id',
      onDelete: 'CASCADE',
    });
  };

  return ConfiguracaoRecorrencia;
};
