const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { validateBody } = require('../middlewares/validateMiddleware');
const { createUserSchema, updateUserSchema } = require('../validations/usuarioValidations');
const authenticateToken = require('../middlewares/authMiddleware');
const verifyUserMiddleware = require('../middlewares/verifyUserMiddleware');

// Rota aberta para a criação de um novo usuários
router.post(
  '/',
  validateBody(createUserSchema), 
  usuarioController.create,
);

// Middlewares para rotas de usuário
router.use(authenticateToken);
router.use(verifyUserMiddleware);

// Rotas de usuario
router.get(
  '/',
  usuarioController.findAll
);

router.get(
  '/:id',
   usuarioController.findOne
);

router.put(
  '/:id',
  validateBody(updateUserSchema),
  usuarioController.update
);

router.delete(
  '/:id',
  usuarioController.delete
);

// Rota protegida
router.get('/protegida', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Acesso permitido!', user: req.user });
})

module.exports = router;
