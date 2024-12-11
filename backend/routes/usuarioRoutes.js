const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authenticateToken = require('../middlewares/authMiddleware');

// Rotas de usuario
router.post('/', usuarioController.create);
router.get('/', usuarioController.findAll);
router.post('/:id', usuarioController.findOne);
router.post('/:id', usuarioController.update);
router.post('/:id', usuarioController.delete);

// Rota protegida
router.get('/protegida', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Acesso permitido!', user: req.user });
})

console.log('Rodas de usuário registradas em api/usuarios')

module.exports = router;
