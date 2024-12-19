const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const { validateBody } = require('../middlewares/validateMiddleware');
const { createCategoriaSchema, updateCategoriaSchema } = require('../validations/categoriaValidations');
const authenticateToken = require('../middlewares/authMiddleware');
const verifyUserMiddleware = require('../middlewares/verifyUserMiddleware');

// Aplica autenticação e verificação de usuário globalmente
router.use(authenticateToken);
router.use(verifyUserMiddleware);

// Rotas para Categorias
router.post(
  '/',
  validateBody(createCategoriaSchema), // Valida o corpo da requisição para criação
  categoriaController.create
);

router.get(
  '/:id_usuario',
  categoriaController.findAll
);

router.put(
  '/:id',
  validateBody(updateCategoriaSchema), // Valida o corpo da requisição para atualização
  categoriaController.update
);

router.delete(
  '/:id',
  categoriaController.softDelete
);

module.exports = router;
