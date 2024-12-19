const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');
const { validateBody } = require('../middlewares/validateMiddleware');
const { createScheduleSchema } = require('../validations/agendamentoValidations');
const authMiddleware = require('../middlewares/authMiddleware');
const verifyUserMiddleware = require('../middlewares/verifyUserMiddleware');

router.use(authMiddleware);
router.use(verifyUserMiddleware);

// Rotas dos agendamentos
router.post(
  '/',
  validateBody(createScheduleSchema),
  agendamentoController.create
);

router.get('/:id', agendamentoController.findOne);
router.get('/', agendamentoController.findAll);
router.put('/:id', agendamentoController.update);
router.delete('/soft-delete/:id', agendamentoController.softDelete);
// router.delete('/permanent/:id', agendamentoController.delete);

module.exports = router;
