const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');

// Rota protegida de teste
router.get('/protected', authenticateToken, (req, res) => {
  res.status(200).json({
    message: 'Rota protegida acessada com sucesso!',
    user: req.user,
  });
});

module.exports = router;