const { Usuario } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const { id_usuario } = req.user;

    const usuario = await Usuario.findByPk(id_usuario);

    if (!usuario || usuario.data_exclusao) {
      return res.status(401).json({ message: 'Usuário não autorizado.' });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    console.log('Erro ao verificar o usuário: ', error);
    res.status(500).json({ message: 'Erro ao verificar o usuário.', error });
  }
};