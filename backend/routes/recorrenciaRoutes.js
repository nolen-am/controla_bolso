/**
 * @swagger
 * tags:
 *   name: Recorrências
 *   description: Gerenciamento de recorrências financeiras.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NovaRecorrencia:
 *       type: object
 *       required:
 *         - recorrencia
 *       properties:
 *         recorrencia:
 *           type: string
 *           description: "Nome da recorrência."
 *           example: "Mensal"
 *         desc_recorrencia:
 *           type: string
 *           description: "Descrição da recorrência."
 *           example: "Pagamentos recorrentes todos os meses."
 *     Recorrencia:
 *       allOf:
 *         - $ref: '#/components/schemas/NovaRecorrencia'
 *         - type: object
 *           properties:
 *             id_recorrencia:
 *               type: integer
 *               description: "ID da recorrência."
 *               example: 1
 *             status:
 *               type: boolean
 *               description: "Status da recorrência (ativa ou inativa)."
 *               example: true
 *             data_criacao:
 *               type: string
 *               format: date-time
 *               description: "Data de criação da recorrência."
 *               example: "2024-12-22T00:00:00Z"
 *             data_alteracao:
 *               type: string
 *               format: date-time
 *               description: "Data da última alteração."
 *               example: "2024-12-22T00:00:00Z"
 */

/**
 * @swagger
 * /recorrencias:
 *   post:
 *     summary: Cria uma nova recorrência.
 *     tags: [Recorrências]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovaRecorrencia'
 *     responses:
 *       201:
 *         description: "Recorrência criada com sucesso."
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recorrencia'
 *       400:
 *         description: "Erro de validação."
 *       500:
 *         description: "Erro interno do servidor."
 *   get:
 *     summary: Lista todas as recorrências ativas.
 *     tags: [Recorrências]
 *     responses:
 *       200:
 *         description: "Lista de recorrências retornada com sucesso."
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recorrencia'
 *       500:
 *         description: "Erro interno do servidor."
 */

/**
 * @swagger
 * /recorrencias/{id}:
 *   get:
 *     summary: Busca uma recorrência pelo ID.
 *     tags: [Recorrências]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "ID da recorrência."
 *     responses:
 *       200:
 *         description: "Recorrência encontrada."
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recorrencia'
 *       404:
 *         description: "Recorrência não encontrada."
 *       500:
 *         description: "Erro interno do servidor."
 *   put:
 *     summary: Atualiza uma recorrência pelo ID.
 *     tags: [Recorrências]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "ID da recorrência a ser atualizada."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovaRecorrencia'
 *     responses:
 *       200:
 *         description: "Recorrência atualizada com sucesso."
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recorrencia'
 *       404:
 *         description: "Recorrência não encontrada."
 *       500:
 *         description: "Erro interno do servidor."
 *   delete:
 *     summary: Realiza soft delete de uma recorrência.
 *     tags: [Recorrências]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "ID da recorrência a ser excluída."
 *     responses:
 *       200:
 *         description: "Recorrência excluída com sucesso."
 *       404:
 *         description: "Recorrência não encontrada."
 *       500:
 *         description: "Erro interno do servidor."
 */

/**
 * @swagger
 * /recorrencias/delete/{id}:
 *   delete:
 *     summary: Exclui permanentemente uma recorrência.
 *     tags: [Recorrências]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "ID da recorrência a ser excluída permanentemente."
 *     responses:
 *       200:
 *         description: "Recorrência excluída permanentemente com sucesso."
 *       404:
 *         description: "Recorrência não encontrada."
 *       500:
 *         description: "Erro interno do servidor."
 */

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
router.post('/', validateBody(createRecorrenciaSchema), recorrenciaController.create);
router.get('/', recorrenciaController.findAll);
router.get('/:id', recorrenciaController.findOne);
router.put('/:id', validateBody(updateRecorrenciaSchema), recorrenciaController.update);
router.delete('/soft-delete/:id', recorrenciaController.softDelete);
router.delete('/delete/:id', recorrenciaController.delete);

module.exports = router;
