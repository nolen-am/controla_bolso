const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateBody } = require('../middlewares/validateMiddleware');
const { registerSchema, loginSchema } = require('../validations/authValidations');

// Rota para registrar um novo usuário
router.post(
  '/register',
  validateBody(registerSchema),
  authController.register
);

// Rota para login do usuário
router.post(
  '/login',
  validateBody(loginSchema),
  authController.login
);

module.exports = router;