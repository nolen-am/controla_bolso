require('dotenv').config();
const { Pool } = require('pg');

// Configuração do pool de conexões com o PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});


// Teste de conexão para garantir que o banco de dados está acessível
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Erro ao conectar ao banco de dados:', err.stack);
    }
    console.log('Conexão bem-sucedida ao banco de dados');
    release(); // Libera o cliente de volta para o pool
});

// Exporta o pool para ser usado em outras partes da aplicação
module.exports = pool;
