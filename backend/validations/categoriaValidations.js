const Joi = require('joi');

// Schema para criação de uma nova categoria
const createCategoriaSchema = Joi.object({
  nome: Joi.string().min(3).max(100).required(),
  descricao: Joi.string().allow(null, ''),
  id_usuario: Joi.number().integer().required(),
  status: Joi.boolean(),
});

// Schema para atualizar uma categoria
const updateCategoriaSchema = Joi.object({
  nome: Joi.string().min(3).max(100),
  descricao: Joi.string().allow(null, ''),
  status: Joi.boolean(),
}).min(1);

module.exports = {
  createCategoriaSchema,
  updateCategoriaSchema,
};