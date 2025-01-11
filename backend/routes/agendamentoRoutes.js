/**
 * @swagger
 * tags:
 *   name: Agendamentos
 *   description: Gerenciamento de agendamentos de transações.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NovoAgendamento:
 *       type: object
 *       required:
 *         - id_transacao
 *         - id_recorrencia
 *       properties:
 *         id_transacao:
 *           type: integer
 *           description: "ID da transação relacionada ao agendamento."
 *           example: 1
 *         id_recorrencia:
 *           type: integer
 *           description: "ID da recorrência relacionada ao agendamento."
 *           example: 2
 *         descricao_agendamento:
 *           type: string
 *           description: "Descrição do agendamento."
 *           example: "Agendamento de pagamento mensal."
 *     Agendamento:
 *       allOf:
 *         - $ref: '#/components/schemas/NovoAgendamento'
 *         - type: object
 *           properties:
 *             id_agendamento:
 *               type: integer
 *               description: "ID do agendamento."
 *               example: 1
 *             status_agendamento:
 *               type: boolean
 *               description: "Status do agendamento (ativo/inativo)."
 *               example: true
 *             data_criacao:
 *               type: string
 *               format: date-time
 *               description: "Data de criação do agendamento."
 *               example: "2024-12-22T00:00:00Z"
 *             data_alteracao:
 *               type: string
 *               format: date-time
 *               description: "Data da última alteração."
 *               example: "2024-12-22T00:00:00Z"
 */

/**
 * @swagger
 * /agendamentos:
 *   post:
 *     summary: Cria um novo agendamento.
 *     tags: [Agendamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoAgendamento'
 *     responses:
 *       201:
 *         description: "Agendamento criado com sucesso."
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agendamento'
 *       400:
 *         description: "Erro de validação."
 *       500:
 *         description: "Erro interno do servidor."
 *   get:
 *     summary: Lista todos os agendamentos.
 *     tags: [Agendamentos]
 *     responses:
 *       200:
 *         description: "Lista de agendamentos retornada com sucesso."
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agendamento'
 *       404:
 *         description: "Nenhum agendamento encontrado."
 *       500:
 *         description: "Erro interno do servidor."
 */

/**
 * @swagger
 * /agendamentos/{id}:
 *   get:
 *     summary: Busca um agendamento pelo ID.
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "ID do agendamento."
 *     responses:
 *       200:
 *         description: "Agendamento encontrado."
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agendamento'
 *       404:
 *         description: "Agendamento não encontrado."
 *       500:
 *         description: "Erro interno do servidor."
 *   put:
 *     summary: Atualiza um agendamento pelo ID.
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "ID do agendamento a ser atualizado."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoAgendamento'
 *     responses:
 *       200:
 *         description: "Agendamento atualizado com sucesso."
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agendamento'
 *       404:
 *         description: "Agendamento não encontrado."
 *       500:
 *         description: "Erro interno do servidor."
 *   delete:
 *     summary: Realiza soft delete de um agendamento.
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "ID do agendamento a ser excluído."
 *     responses:
 *       200:
 *         description: "Agendamento excluído com sucesso."
 *       404:
 *         description: "Agendamento não encontrado."
 *       500:
 *         description: "Erro interno do servidor."
 */

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
router.post('/', validateBody(createScheduleSchema), agendamentoController.create);
router.get('/:id', agendamentoController.findOne);
router.get('/', agendamentoController.findAll);
router.put('/:id', agendamentoController.update);
router.delete('/soft-delete/:id', agendamentoController.softDelete);
// router.delete('/permanent/:id', agendamentoController.delete);

module.exports = router;
