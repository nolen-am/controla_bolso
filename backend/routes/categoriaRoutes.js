const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

// Rotas para Categorias
router.post('/', categoriaController.create);
router.get('/:id_usuario', categoriaController.findAll);
router.put('/:id', categoriaController.update);
router.delete('/:id', categoriaController.softDelete);

module.exports = router;