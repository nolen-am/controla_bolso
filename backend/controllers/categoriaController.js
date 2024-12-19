const { Categoria } = require('../models');
const { createCategoriaSchema, updateCategoriaSchema } = require('../validations/categoriaValidations');

// Criar nova categoria
exports.create = async (req, res) => {
  const { nome, id_usuario, descricao, status } = req.body;

  try {
    // Verificando se já existe uma categoria com este nome para o usuário logado
    const existingCategoria = await Categoria.findOne({
      where: { nome, id_usuario }
    });

    if (existingCategoria) {
      return res.status(400).json({ message: 'Essa categoria já existe!' });
    }

    // Criando a nova categoria
    const categoria = await Categoria.create({
      nome,
      descricao,
      id_usuario,
      status,
      data_criacao: new Date(),
    });

    res.status(200).json({ message: 'Categoria criada com sucesso!', categoria });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erro ao criar a categoria!', error });
  }
};

// Listando as categorias do usuário logado
exports.findAll = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const categorias = await Categoria.findAll({
      where: { 
        id_usuario, 
        status: true,
        data_exclusao: null,
      },
    });

    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar as categorias!', error });
  }
};

// Atualizando uma categoria já existente
exports.update = async (req, res) => {
  const { error } = updateCategoriaSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: 'Erro na validação dos dados.', error: error.details });
  }

  const { id } = req.params;
  const { nome } = req.body;
  const { descricao } = req.body;
  const { status } = req.body;

  try {
    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada.' });
    }

    categoria.nome = nome,
    categoria.descricao = descricao;
    categoria.status = status;
    categoria.data_alteracao = new Date();

    await categoria.save();

    res.status(200).json({ message: 'Categoria atualizada com sucesso!', categoria });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar categoria', error });
  }
};

// Desativar uma categoria
exports.deactivate = async (req, res) => {
  const { id } = req.params;

  try {
    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada.' });
    }

    // Marcando a categoria como inativa
    categoria.status = false;
    categoria.data_alteracao = new Date();
    
    await categoria.save();

    res.status(200).json({ message: `A Categoria: ${categoria} foi desativada com sucesso!` });
  } catch (error) {
    res.status(500).json({ message: 'Não foi possível desativar a categoria.' });
  }
};

// Deletar categoria
exports.softDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    // Marcando a categoria como inativa
    categoria.status = false;
    categoria.data_exclusao = new Date();

    await categoria.save();

    res.status(200).json({ message: 'Categoria excluída com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Não foi possível excluir essa categoria.' });
  }
};