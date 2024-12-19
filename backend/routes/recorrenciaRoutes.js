const express = require('express');
const router = express.Router();
const recorrenciaController = require('../controllers/recorrenciaController');
const { validateBody } = require('../middlewares/validateMiddleware');
const { createRecorrenciaSchema, updateRecorrenciaSchema } = require('../validations/recorrenciaValidations');
const authMiddleware = require('../middlewares/authMiddleware');
const verifyUserMiddleware = require('../middlewares/verifyUserMiddleware');

router.use(authMiddleware);
router.use(verifyUserMiddleware);

// Rotas de recorrência
router.post(
  '/',
  validateBody(createRecorrenciaSchema),
  recorrenciaController.create,
);

router.get(
  '/', 
  recorrenciaController.findAll,
);

router.get(
  '/:id',
  recorrenciaController.findOne,
);

router.put(
  '/:id',
  validateBody(updateRecorrenciaSchema),
  recorrenciaController.update,
);

router.delete(
  '/soft-delete/:id', 
  recorrenciaController.softDelete,
);

router.delete(
  '/delete/:id', 
  recorrenciaController.delete,
);

module.exports = router;
