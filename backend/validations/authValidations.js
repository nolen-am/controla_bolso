const Joi = require('joi');

const registerSchema = Joi.object({
  nome_usuario: Joi.string().min(3).max(50).required(),
  primeiro_nome: Joi.string().min(3).max(50).required(),
  nome_usuario: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(3).required(),
  nivel: Joi.number().integer().valid(1, 2).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  senha: Joi.string().min(3).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};