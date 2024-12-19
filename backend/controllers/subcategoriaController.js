const { Subcategoria, Categoria } = require('../models');

// Criação de nova subcategoria
exports.create = async (req, res) => {

  try {
    const { nome, id_categoria, descricao, status } = req.body;

    // Verificar se a categoria existe
    const existeCategoria = await Categoria.findOne({
      attributes:  ["nome", "id_categoria"],
      where: { data_exclusao: null, status: true } 
    });

    if (!existeCategoria) {
      return res.status(401).json({ message: "Categoria não existe!" })
    }

    // Verificar se a subcategoria existe
    const existeSubcategoria = await Subcategoria.findOne({
      where: { nome, id_categoria },
    });

    if (existeSubcategoria) {
      return res.status(400).json({ message: 'Essa subcategoria já existe!' });
    }

    // Cria a subcategoria
    const novaSubcategoria = await Subcategoria.create({
      nome,
      descricao,
      id_categoria,
      status,
      data_criacao: new Date(),
    });

    res.status(201).json({ message: 'Subcategoria criada com sucesso!', novaSubcategoria });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erro ao criar subcategoria', error });
  }
};

// Listando todas as subcategorias
exports.findByCategory = async (req, res) => {
  const { id_categoria } = req.params;

  try {
    const subcategorias = await Subcategoria.findAll({
      where: {
        id_categoria,
        status: true,
        data_exclusao: null,
      },
      include: {
        model: Categoria,
        as: 'categoria',
        attributes: ['id_categoria', 'nome'],
      },
    });

    res.status(200).json(subcategorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar subcategorias', error });
  }
};

// Buscando uma subcategoria pelo ID
exports.findOne = async (req, res) => {
  try {
    const subcategoria = await Subcategoria.findByPk(req.params.id, {
      include: {
        model: Categoria,
        as: 'categoria',
        attributes: ['id_categoria', 'nome'],
      },
    });

    if (!subcategoria) {
      res.status(404).json({ message: 'Subcategoria não encontrada!' });
    }

    res.status(200).json(subcategoria);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erro ao buscar subcategoria', error});
  }
};

// Atualizar uma subcategoria
exports.update = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, status } = req.body;

  try {
    const subcategoria = await Subcategoria.findByPk(id);

    if (!subcategoria) {
      res.status(404).json({ message: 'Subcategoria não encontrada' });
    }

    subcategoria.nome = nome;
    subcategoria.descricao = descricao;
    subcategoria.status = status;
    subcategoria.data_alteracao = new Date();

    await subcategoria.save();

    res.status(200).json({ message: 'Subcategoria atualizada com sucesso!', subcategoria });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erro ao atualizar subcategoria', error });
  }
};

// Deletar uma subcategoria
exports.softDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const subcategoria = await Subcategoria.findByPk(id);

    if (!subcategoria) {
      res.status(404).json({ message: 'Subcategoria não encontrada' });
    }

    // Setando a subcategoria como inativa
    subcategoria.status = false;
    subcategoria.data_exclusao = new Date();

    await subcategoria.save();

    res.status(200).json({ message: 'Subcategoria excluída com sucesso!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Não foi possível excluir essa subcategoria', error });
  }
};