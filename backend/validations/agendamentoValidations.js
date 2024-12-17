const Joi = require('joi');

// Validação para a criação de novos agendamentos
const createScheduleSchema = Joi.object({
  id_transacao: Joi.number().integer().required().messages({
    'any.required': 'O campo id_transacao é obrigatório.',
    'number.base': 'O campo id_transacao deve ser um número.'
  }),
  id_recorrencia: Joi.number().integer().required().messages({
    'any.required': 'O campo id_recorrencia é obrigatório.',
    'number.base': 'O campo id_recorrencia deve ser um número.'
  }),
  descricao_agendamento: Joi.string().max(255).optional().messages({
    'string.base': 'O campo descricao_agendamento deve ser um texto.',
    'string.max': 'O campo descricao_agendamento deve ter no máximo 255 catacteres.',
  }),
});

// Exportando os schemas
module.exports = {
  createScheduleSchema,
};