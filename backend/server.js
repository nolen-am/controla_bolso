const express = require('express');
const app = express();
const pool = require('./config/database.js');

// Configuração básica do servidor
const PORT = process.env.PORT || 3000;

// Endpoint para verificar se o servior está funcionando corretamente
app.get('/', (req, res) => {
    res.send('Servidor backend está funcionando!');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
