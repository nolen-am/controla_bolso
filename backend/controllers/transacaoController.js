const { Op } = require('sequelize');
const { Transacao, Usuario, Categoria, Subcategoria, Recorrencia } = require('../models');
const { createTransactionSchema } = require('../validations/transacaoValidations');

// Criação de uma nova transação
exports.create = async (req, res) => {
  const { error } = createTransactionSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: "Erro na validação dos dados.", error: error.details });
  }


  try {
    const { id_categoria, id_subcategoria, id_recorrencia, tipo, valor, data, descricao, recorrente } = req.body;

    // Obtendo o id_usuario do token decodificado
    const id_usuario = req.user && req.user.id_usuario;

    // Verificando se o usuário está autenticado
    if (!id_usuario) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    // Verificando se a categoria existe
    const categoria = await Categoria.findByPk(id_categoria);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada!' });
    }

    // Verifica se a subcategoria existe e se ela pertence à categoria informada
    const subcategoria = await Subcategoria.findOne({
      where: { id_subcategoria, id_categoria },
    });
    if (!subcategoria) {
      return res
        .status(404)
        .json({ message: 'Subcategoria inválida ou não encontrada para a categoria fornecida.' });
    }

    // Criando uma nova transação
    const transacao = await Transacao.create({
      id_usuario,
      id_categoria,
      id_subcategoria,
      id_recorrencia,
      tipo,
      valor,
      data,
      descricao,
      recorrente,
      data_criacao: new Date(),
    });

    res.status(201).json({ message: 'Transação criada com sucesso', transacao });
  } catch (error) {
    console.log('Erro no método create:', error);
    res.status(500).json({ message: 'Erro ao criar transação', error });
  }
};

// Listar transações (com filtros opcionais)
exports.findAll = async (req, res) => {
  const { id_usuario } = req.user;
  const { id_subcategoria, tipo, data_inicial, data_final, recorrente, valor_min, valor_max } = req.query;

  try {
    const whereConditions = {
      id_usuario,
      data_exclusao: null,
    };

    if (id_usuario) whereConditions.id_usuario = id_usuario;
    if (id_subcategoria) whereConditions.id_subcategoria = id_subcategoria;
    if (tipo) whereConditions.tipo = tipo;
    if (recorrente) whereConditions.recorrente = recorrente;
    if (data_inicial && data_final) {
      whereConditions.data = { [Op.between]: [data_inicial, data_final] };
  }  else if (data_inicial) {
      whereConditions.data = { [Op.gte]: data_inicial };
    } else if (data_final) {
      whereConditions.data = { [Op.lte]: data_final };
    }
    if (valor_min || valor_max) {
      whereConditions.valor = {};
      if (valor_min) whereConditions.valor[Op.gte] = Number(valor_min);
      if (valor_max) whereConditions.valor[Op.lte] = Number(valor_max);
    }

    const transacoes = await Transacao.findAll({
      where: whereConditions,
      include: [
        { model: Categoria, as: 'categoria', attributes: ['id_categoria', 'nome'] },
        { model: Subcategoria, as: 'subcategoria', attributes: ['id_subcategoria', 'nome'] },
      ],
    });

    res.status(200).json(transacoes);

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Erro ao listar transações', error });
  }
};

// Buscar uma transação específica
exports.findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const transacao = await Transacao.findByPk(id, {
      include: [
        { model: Usuario, as: 'usuario', attributes: ['id_usuario', 'nome_usuario'] },
        { model: Categoria, as: 'categoria', attributes: ['id_categoria', 'nome'] },
        { model: Subcategoria, as: 'subcategoria', attributes: ['id_subcategoria', 'nome'] },
      ],
    });

    if (!transacao) {
      return res.status(404).json({ message: 'Não foi possível encontrar essa transação.' });
    }

    res.status(200).json(transacao);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erro ao tentar buscar a transação informada.', error });
  }
};

// Atualizar uma transação
exports.update = async (req, res) => {
  const { id } = req.params;
  const { tipo, valor, data, descricao, recorrente } = req.body;

  try {
    const transacao = await Transacao.findByPk(id);

    if (!transacao) {
      res.status(404).json({ message: 'Transação não encontrada!' });
    }

    transacao.tipo = tipo || transacao.tipo;
    transacao.valor = valor || transacao.valor;
    transacao.data = data|| transacao.data;
    transacao.descricao = descricao || transacao.descricao;
    transacao.recorrente = recorrente || transacao.recorrente;
    transacao.data_alteracao = new Date();

    await transacao.save();

    res.status(200).json({ message: 'Transação atualizada com sucesso', transacao });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erro ao atualizar transação', error });
  }
};

// Soft delete de uma transação
exports.softDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const transacao = await Transacao.findByPk(id);

    if (!transacao) {
      res.status(404).json({ message: 'Transacao não encontrada!' });
    }

    transacao.data_exclusao = new Date();

    await transacao.save();

    res.status(200).json({ message: 'Transacao exluída com sucesso!', transacao });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erro ao tentar exluir essa transação.', error });
  }
};

// Delete permanente da transação (admin)
exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const transacao = await Transacao.findByPk(id);

    if (!transacao) {
      res.status(404).json({ message: 'Transação não encontrada' });
    }

    await Transacao.destroy({ where: { id_transacao: id } });

    res.status(200).json({ message: 'Transação excluída permanentemente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erro ao tentar exluir transação permanentemente.', error });
  }
};
