const { Usuario } = require('../models');

// Criar novo usuário
exports.create = async (req, res) => {

  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json({ message: 'Usuário criado com sucesso: ', usuario });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'Erro de Validação! Não foi possível criar o usuário!',
        errors: error.errors.map((err) => err.message),
      });
    }
    res.status(500).json({ message: 'Erro ao criar usuário', error });
  }
};

// Listando todos os usuários
exports.findAll = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar usuários', error });
  }
};

// Buscar um usuário pelo ID
exports.findOne = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      include: [{ association: 'categorias' }],
    });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado'});
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao tentar encontrar este usuário', error });
  }
};

// Atualizar um usuário pelo seu ID
exports.update = async (req, res) => {

  try {
    const [updated] = await Usuario.update(req.body, {
      where: { id_usuario: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }
    const usuarioAtualizado = await Usuario.findByPk(req.params.id);
    res.status(200).json({ message: 'Usuário atualizado com sucesso: ', usuarioAtualizado });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'Erro de validação',
        errors: error.errors.map((err) => err.massage),
      })
    }
    res.status(500).json({ message: 'Erro ao atualizar o usuário', error });
  }
};

// Deletando um usuário pelo ID
exports.delete = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }
    usuario.data_exclusao = new Date();
    await usuario.save();
    res.status(200).json({ message: 'Usuário excluído!' });
  } catch(error) {
    res.status(500).json({ message: 'Erro ao excluir o usuário', error });
  }
}
