const express = require('express');
const router = express.Router();
const subcategoriaController = require('../controllers/subcategoriaController');
const { validateBody } = require('../middlewares/validateMiddleware');
const { createSubcategoriaSchema, updateSubcategoriaSchema } = require('../validations/subcategoriaValidations');
const authMiddleware = require('../middlewares/authMiddleware');
const verifyUserMiddleware = require('../middlewares/verifyUserMiddleware');

router.use(authMiddleware);
router.use(verifyUserMiddleware);

// Rotas de subcategorias
router.post(
  '/',
  validateBody(createSubcategoriaSchema),
  subcategoriaController.create
);

router.get(
  '/categoria/:id_categoria',
  subcategoriaController.findByCategory
);

router.get(
  '/:id',
  subcategoriaController.findOne
);

router.put(
  '/:id',
  validateBody(updateSubcategoriaSchema),
  subcategoriaController.update
);

router.delete(
  '/:id',
  subcategoriaController.softDelete
);

module.exports = router;
