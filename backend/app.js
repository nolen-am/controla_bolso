const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./models');

// Carregando as variáveis de ambiente
dotenv.config();

const app = express();

// Middlewares globais
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Teste da conexão com o banco de dados
db.sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados foi bem sucedida!');
  })
  .catch((error) => {
    console.log('Erro ao se conectar com o banco de dados!');
  });

// Sincronizando o banco de dados (apenas para desenvolvimento)
if (process.env.NODE_ENV === 'development') {
  db.sequelize.sync();
}

// Rotas
const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const testRoutes = require('./routes/testAuthRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const subcategoriaRoutes = require('./routes/subcategoriaRoutes');
const transacaoRoutes = require('./routes/transacaoRoutes');

app.use('/api/auth', authRoutes); // Rotas de autenticação
app.use('/api/usuarios', usuarioRoutes); // Rotas de usuario
app.use('/api/testAuthRoutes', testRoutes);  // Rota de teste de autenticação de usuário
app.use('/api/categorias', categoriaRoutes); // Rotas de categoria
app.use('/api/subcategorias', subcategoriaRoutes); // Rotas de subcategoria
app.use('/api/transacoes', transacaoRoutes); // Rotas de transação

// Iniciando o servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escutando na porta ${PORT}`);
});
