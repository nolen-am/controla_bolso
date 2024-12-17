const Joi = require('joi');

// Schema para criar uma subcategoria
const createSubcategoriaSchema = Joi.object({
  nome: Joi.string().min(3).max(100).required(),
  descricao: Joi.string().allow(null, ''),
  id_categoria: Joi.number().integer().required(),
  status: Joi.boolean(),
});

// Schema para atualizar uma subcategoria
const updateSubcategoriaSchema = Joi.object({
  nome: Joi.string().min(3).max(100),
  descricao: Joi.string().allow(null, ''),
  status: Joi.boolean(),
}).min(1);

module.exports = {
  createSubcategoriaSchema,
  updateSubcategoriaSchema,
};