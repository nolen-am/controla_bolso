const Joi = require('joi');

// Schema de validação para criação de novos usuários
const createUserSchema = Joi.object({
  nome_usuario: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.base': '"nome_usuario" deve ser um texto.',
      'string.empty': '"nome_usuario" não pode estar vazio.',
      'string.min': '"nome_usuario" deve ter pelo menos 3 caracteres.',
      'string.max': '"nome_usuario" deve ter no máximo 30 caracteres.',
      'any_required': '"nome_usuario" é obrigatório!'
    }),
    primeiro_nome: Joi.string().min(2).max(50).required(),
    ultimo_nome: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required().messages({
      'string.email': '"email" deve ser um e-mail válido!',
      'any.required': '"email" é obrigatório!'
    }),
    senha: Joi.string().min(6).required().messages({
      'string.min': '"senha" deve ter pelo menos 6 caracteres.',
      'any.required': '"senha" é obrigatória.'
    }),
    nivel: Joi.number().integer().required(),
});

// Schema de validação para Login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  senha: Joi.string().required(),
});

// Schema de atualização do usuário
const updateUserSchema = Joi.object({
  nome_usuario: Joi.string().alphanum().min(3).max(30),
  primeiro_nome: Joi.string().min(2).max(50),
  ultimo_nome: Joi.string().min(2).max(50),
  email: Joi.string().email(),
  nivel: Joi.number().integer(),
  status: Joi.boolean(),
}).min(1);

module.exports = {
  createUserSchema,
  loginSchema,
  updateUserSchema,
};