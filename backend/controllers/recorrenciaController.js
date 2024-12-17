const { Recorrencia } = require('../models');
const { createRecorrenciaSchema, updateRecorrenciaSchema } = require('../validations/recorrenciaValidations');

// Criando uma nova recorrência
exports.create = async (req, res) => {
  const { recorrencia, desc_recorrencia } = req.body;
  const { error } = createRecorrenciaSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: 'Erro na validação dos dados.', error: error.details });
  }

  try {
    const novaRecorrencia = await Recorrencia.create({
      recorrencia,
      desc_recorrencia,
      status: true,
      data_criacao: new Date(),
    });

    res.status(201).json({ message: "Recorrência criada com sucesso!", recorrencia: novaRecorrencia });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao tentar criar a nova recorrência.", error: error.message });
  }
};

// Listar todas as recorrências
exports.findAll = async (req, res) => {
  try {
    const recorrencias = await Recorrencia.findAll({
      where: { status: true, data_exclusao: null },
    });

    res.status(200).json(recorrencias);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao tentar listar todas as recorrências!", error: error.message });
  }
};

// Buscar uma recorrência específica
exports.findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const recorrencia = await Recorrencia.findByPk(id);

    if (!recorrencia || !recorrencia.status) {
      return res.status(404).json({ message: "Recorrência não encontrada!" });
    }
  
    res.status(200).json(recorrencia);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao tentar buscar a recorrência", error: error.message });
  }
};

// Atualizando uma recorrência
exports.update = async (req, res) => {
  const { id } = req.params;
  const { recorrencia, desc_recorrencia } = req.body;
  const { error } = updateRecorrenciaSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: 'Erro na validação dos dados.', error: error.details });
  }

  try {
    if (!id) {
      return res.status(400).json({ message: "ID da recorrência é obrigatório!" });
    }

    const recorrenciaExiste = await Recorrencia.findByPk(id);

    if (!recorrenciaExiste || !recorrenciaExiste.status) {
      return res.status(404).json({ message: "Recorrência não encontrada!" });
    }

    recorrenciaExiste.recorrencia = recorrencia || recorrenciaExiste.recorrencia;
    recorrenciaExiste.desc_recorrencia = desc_recorrencia || recorrenciaExiste.desc_recorrencia;
    recorrenciaExiste.data_alteracao = new Date();

    await recorrenciaExiste.save();

    res.status(200).json({ message: "Recorrência atualizada com sucesso!", recorrencia: recorrenciaExiste });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao tentar atualizar a recorrência!", error: error.message });
  }
};

// Soft delete de uma recorrência
exports.softDelete = async (req, res) => {
  const { id } = req.params;

  try {
    console.log('ID recebido na rota:', id);

    // Verificando se o ID foi informado
    if (!id) {
      return res.status(400).json({ message: "ID da recorrência é obrigatório!" });
    }

    // Verificando se a recorrência existe
    const recorrencia = await Recorrencia.findByPk(id);

    if (!recorrencia || !recorrencia.status) {
      return res.status(404).json({ message: "Recorrência não encontrada ou já excluída!" });
    }

    // Atualizando os campos para soft delete
    recorrencia.status = false;
    recorrencia.data_alteracao = new Date();
    recorrencia.data_exclusao = new Date();

    await recorrencia.save();

    res.status(200).json({ message: "Recorrência excluída com sucesso!", recorrencia });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao tentar realizar o soft delete da recorrência!", error: error.message });
  }
};

// Delete permanente de uma recorrência
exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const recorrencia = await Recorrencia.findByPk(id);

    if (!recorrencia) {
      return res.status(404).json({ message: 'Recorrência não encontrada!' });
    }

    await Recorrencia.destroy({ where: { id_recorrencia: id } });

    res.status(200).json({
      message: 'Recorrência excluída permanentemente com sucesso!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao tentar realizar o delete permanente da recorrência!', error: error.message, });
  }
};
