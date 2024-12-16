const { Op } = require('sequelize');
const { Agendamento, Transacao, Recorrencia } = require('../models');

// Criando um novo agendamento
exports.create = async (req, res) => {
  try {
    const { id_transacao, id_recorrencia, descricao_agendamento } = req.body;

    // Validando se os ID's foram informados na requisição
    if (!id_transacao || !id_recorrencia) {
      res.status(400).json({ message: 'Transação e recorrência são obrigatórios' });
    }

    // Verificar se a transação existe
    const transacao = await Transacao.findByPk(id_transacao);
    if (!transacao) {
      return res.status(404).json({ message: 'Transação não encontrada!' });
    }

    // Verificar se a recorrência existe
    const recorrencia = await Recorrencia.findByPk(id_recorrencia);
    if (!recorrencia) {
      return res.status(404).json({ message: 'Recorrência não encontrada!' });
    }

    // Criar o agendamento
    const agendamento = await Agendamento.create({
      id_transacao,
      id_recorrencia,
      descricao_agendamento,
      status_agendamento: true,
      data_criacao: new Date(),
    });

    res.status(201).json({ message: 'Agendamento criado com sucesso!', agendamento });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao tentar criar o agendamento!", error });
  }
};

// Listar todos os agendamentos com filtros opcionais
exports.findAll = async (req, res) => {
  try {
    const { status_agendamento, data_inicial, data_final } = req.query;

    const whereConditions = {
      data_exclusao: null,
    };

    if (status_agendamento !== undefined) {
      whereConditions.status_agendamento = status_agendamento === 'true';
    }

    if (data_inicial && data_final) {
      whereConditions.data_criacao = {
        [Op.between]: [new Date(data_inicial), new Date(data_final)],
      };
    }

    const agendamentos = await Agendamento.findAll({
      where: whereConditions,
      include: [
        {
          model: Transacao,
          as: 'transacao',
          attributes: ['id_transacao', 'descricao', 'valor'],
        },
        {
          model: Recorrencia,
          as: 'recorrencia',
          attributes: ['id_recorrencia', 'recorrencia', 'desc_recorrencia'],
        },
      ],
    });

    if (agendamentos.length === 0) {
      return res.status(404).json({ message: 'Nenhum agendamento encontrado.' });
    }

    res.status(200).json(agendamentos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar agendamentos!', error });
  }
};

// Buscando por um agendamento específico
exports.findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const agendamento = await Agendamento.findByPk(id, {
      include: [
        { model: Transacao, as: 'transacao' },
        { model: Recorrencia, as: 'recorrencia' },
      ],
    });

    if (!agendamento) {
      return res.status(404).json({ message: "Agendamento não encontrado" });
    }

    res.status(200).json(agendamento);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao buscar agendamento!", error });
  }
};

// Atualizar um agendamento
exports.update = async (req, res) => {
  const { id } = req.params;
  const { descricao_agendamento, status_agendamento, id_recorrencia } = req.body;

  try {
    const agendamento = await Agendamento.findByPk(id);

    if (!agendamento) {
      return res.status(404).json({ message: "Agendamento não encontrado!" });
    }

    agendamento.descricao_agendamento = descricao_agendamento || agendamento.descricao_agendamento;
    agendamento.status_agendamento = status_agendamento !== undefined ? status_agendamento : agendamento.status_agendamento;
    agendamento.id_recorrencia = id_recorrencia || agendamento.id_recorrencia;
    agendamento.data_alteracao = new Date();

    await agendamento.save();

    res.status(200).json({ message: "Agendamento atualizado com sucesso!", agendamento });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao tentar atualizar o agendamento.", error });
  }
};

// Soft delete agendamento
exports.softDelete = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscando o agendamento pelo ID

    const agendamento = await Agendamento.findByPk(id);
    
    // Validando se o agendamento existe
    if (!agendamento) {
      res.status(404).json({ message: "Agendamento não encontrado!" });
    }

    agendamento.status_agendamento = false;
    agendamento.data_exclusao = new Date();

    await agendamento.save();

    res.status(200).json({ message: "Agendamento deletado com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao apagar agendamento.", error: error.message });
  }
};

// Excluindo permanentemente um agendamento
// exports.delete = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const agendamento = await Agendamento.findByPk(id);

//     // Valida se o agendamento foi localizado
//     if (!agendamento) {
//       return res.status(404).json({ message: "Agendamento não encontrado." });
//     }

//     await Agendamento.destroy({ where: { id_agendamento: id } });

//     res.status(200).json({ message: "Agendamento excluído permanentemente." });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Erro ao tentar excluir o agendamento", error });
//   }
// };
