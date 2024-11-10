const express = require('express');
const app = express();
const pool = require('./config/database'); // Importa a conexão com o banco de dados

// Configuração básica do servidor
const PORT = process.env.PORT || 3000;

// Endpoint simples para verificar se o servidor está rodando
app.get('/', (req, res) => {
    res.send('Servidor backend está funcionando!');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
