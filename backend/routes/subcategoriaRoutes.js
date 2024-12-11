const express = require('express');
const router = express.Router();
const subcategoriaController = require('../controllers/subcategoriaController');

// Rotas de subcategorias
router.post('/', subcategoriaController.create);
router.get('/categoria/:id_categoria', subcategoriaController.findByCategory);
router.get('/:id', subcategoriaController.findOne);
router.put('/:id', subcategoriaController.update);
router.delete('/:id', subcategoriaController.softDelete);

module.exports = router;
