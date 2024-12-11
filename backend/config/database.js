const { Sequelize } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados feita com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao tentar se conectar com o banco de dados: ', error)
  });

  module.exports = sequelize;