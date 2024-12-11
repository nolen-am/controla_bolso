const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Obtendo o token do cabeçalho da requisição
  const authHeader = req.headers['authorization'];

  // Verificando se o token foi fornecido
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Token não fornecido!' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verifica se o token é válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'segredo_secreto');

    if (!decoded.id_usuario) {
      return res.status(401).json({ message: 'Token inválido!' });
    }

    // Armazena os dados do usuário decodificados na requisição
    req.user = decoded;

    // Permite que a requisição continue para a próxima função
    next();
  } catch (error) {
    // Retorna se o token for inválido
    console.log('Erro ao decodificar o token: ', error);
    res.status(401).json({ message: 'Token inválido!' });
  }
};
