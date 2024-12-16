const express = require('express');
const router = express.Router();
const recorrenciaController = require('../controllers/recorrenciaController');

// Rotas de recorrência
router.post('/', recorrenciaController.create);
router.get('/', recorrenciaController.findAll);
router.get('/:id', recorrenciaController.findOne);
router.put('/:id', recorrenciaController.update);
router.delete('/soft-delete/:id', recorrenciaController.softDelete);
router.delete('/delete/:id', recorrenciaController.delete);

module.exports = router;
