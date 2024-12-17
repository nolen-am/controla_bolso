const Joi = require('joi');

// Validações para a criação de transações
const createTransactionSchema = Joi.object({
  id_categoria: Joi.number().integer().required().messages({
    'any.required': 'O campo id_categoria é obrigatório.',
    'number.base': 'O campo id_categoria deve ser um número',
  }),
  id_subcategoria: Joi.number().integer().required().messages({
    'any.required': 'O campo id_subcategoria é obrigatório.',
    'number.base': 'O campo id_subcategoria deve ser um número',
  }),
  id_recorrencia: Joi.number().integer().allow(null).messages({
    'number.base': 'O campo id_recorrencia deve ser um número.',
    'number.integer': 'O campo id_recorrencia deve ser um número inteiro.'
  }),
  tipo: Joi.number().integer().valid(1, 2, 3).required().messages({
    'any.only': 'O campo tipo deve ser 1, 2 ou 3.',
    'any.required': 'O campo tipo é obrigatório.',
  }),
  valor: Joi.number().positive().required().messages({
    'number.base': 'O campo valor deve ser um número',
    'number.positive': 'O campo valor deve ser um número positivo',
    'any.required': 'O campo valor é obrigatório',
  }),
  descricao: Joi.string().max(255).required().messages({
    'string.base': 'O campo descricao deve ser uma string.',
    'string.max': 'O campo descricao deve ter no máximo 255 caracteres.',
    'any.required': 'O campo descricao é obrigatório.'
  }),
  data: Joi.date().required().messages({
    'data.base': 'O campo data deve ser uma data válida.',
    'any.reqiored': 'O campo data é obrigatório!',
  }),
  recorrente: Joi.boolean().optional(),
});

module.exports = {
  createTransactionSchema,
}