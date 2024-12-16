const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');

// Rotas dos agendamentos
router.post('/', agendamentoController.create);
router.get('/:id', agendamentoController.findOne);
router.get('/', agendamentoController.findAll);
router.put('/:id', agendamentoController.update);
router.delete('/soft-delete/:id', agendamentoController.softDelete);
// router.delete('/permanent/:id', agendamentoController.delete);

module.exports = router;
