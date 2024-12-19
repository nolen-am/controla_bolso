const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido.' });
  }

  const token = authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Token inválido ou ausente.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'segredo_secreto'); // Decodifica o token
    req.user = decoded; 
    next();
  } catch (error) {
    console.log('Erro ao decodificar o token: ', error);
    res.status(403).json({ message: 'Token inválido ou expirado.', error: error.message });
  }
};
