const { Usuario } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Criação de novo usuário
exports.register = async (req, res) => {
  const { nome_usuario, primeiro_nome, ultimo_nome, email, senha, nivel } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  try {
    // Verificar se o e-mail foi enviado e está no formato correto
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: 'E-mail inválido!' });
    }

    // Verificando se o e-mail já existe
    const existingMail = await Usuario.findOne({ where: { email } });
    if (existingMail) {
      return res.status(400).json({ message: 'Este e-mail já existe!' });
    }

    // Gerar hash da senha antes de salvar
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Criar novo usuário com senha criptografada
    const usuario = await Usuario.create({
      nome_usuario,
      primeiro_nome,
      ultimo_nome,
      email,
      senha: hashedPassword,
      nivel,
    });

    res.status(201).json({ message: 'Usuário criado com sucesso!', usuario });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro ao criar usuário!', error });
  }
};


// Login do usuário
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verificar se o e-mail existe
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    // Verificar se a senha está correta
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Senha incorreta!' });
    }

    // Gerar o token JWT
    const token = jwt.sign(
      { id_usuario: usuario.id_usuario, email: usuario.email },
      process.env.JWT_SECRET || 'segredo_secreto',
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login realizado com sucesso!', token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao realizar login!', error: error.message });
  }
};