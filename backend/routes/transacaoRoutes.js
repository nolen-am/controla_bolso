const express = require('express');
const router = express.Router();
const transacaoController = require('../controllers/transacaoController');
const { validateBody } = require('../middlewares/validateMiddleware');
const { createTransactionSchema } = require('../validations/transacaoValidations');
const authMiddleware = require('../middlewares/authMiddleware');
const verifyUserMiddleware = require('../middlewares/verifyUserMiddleware');

router.use(authMiddleware);
router.use(verifyUserMiddleware);

// Rotas das transações
router.post(
  '/',
  validateBody(createTransactionSchema),
  transacaoController.create
);

router.get('/', transacaoController.findAll);
router.get('/:id', transacaoController.findOne);
router.put('/:id', transacaoController.update);
router.delete('/permanent/:id', transacaoController.delete);
router.delete('/:id', transacaoController.softDelete);

module.exports = router;
