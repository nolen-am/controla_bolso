const express = require('express');
const router = express.Router();
const transacaoController = require('../controllers/transacaoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

// Rotas das transações
router.post('/', transacaoController.create);
router.get('/', transacaoController.findAll);
router.get('/:id', transacaoController.findOne);
router.put('/:id', transacaoController.update);
router.delete('/permanent/:id', transacaoController.delete);
router.delete('/:id', transacaoController.softDelete);

module.exports = router;
