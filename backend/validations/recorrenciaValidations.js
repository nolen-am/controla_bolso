const Joi = require('joi');

// Schema para criar uma nova recorrência
const createRecorrenciaSchema = Joi.object({
  recorrencia: Joi.string().min(3).max(100).required(),
  desc_recorrencia: Joi.string().allow(null, ''),
});

// Schema para atualizar uma recorrência
const updateRecorrenciaSchema = Joi.object({
  recorrencia: Joi.string().min(3).max(100),
  desc_recorrencia: Joi.string().allow(null, ''),
});

module.exports = {
  createRecorrenciaSchema,
  updateRecorrenciaSchema,
};