/**
 * @swagger
 * tags:
 *   name: Transações
 *   description: Gerenciamento de transações financeiras.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NovaTransacao:
 *       type: object
 *       required:
 *         - id_categoria
 *         - id_subcategoria
 *         - tipo
 *         - valor
 *         - data
 *       properties:
 *         id_categoria:
 *           type: integer
 *           description: "ID da categoria associada."
 *           example: 1
 *         id_subcategoria:
 *           type: integer
 *           description: "ID da subcategoria associada."
 *           example: 2
 *         tipo:
 *           type: integer
 *           description: "Tipo da transação (1: Entrada, 2: Saída, 3: Investimento)."
 *           example: 1
 *         valor:
 *           type: number
 *           format: float
 *           description: "Valor da transação."
 *           example: 1500.50
 *         data:
 *           type: string
 *           format: date
 *           description: "Data da transação."
 *           example: 2024-12-22
 *         descricao:
 *           type: string
 *           description: "Descrição da transação."
 *           example: "Salário recebido."
 *         recorrente:
 *           type: boolean
 *           description: "Indica se a transação é recorrente."
 *           example: false
 *     Transacao:
 *       allOf:
 *         - $ref: '#/components/schemas/NovaTransacao'
 *         - type: object
 *           properties:
 *             id_transacao:
 *               type: integer
 *               description: "ID da transação."
 *               example: 1
 *             data_criacao:
 *               type: string
 *               format: date-time
 *               description: "Data de criação da transação."
 *               example: 2024-12-22T00:00:00Z
 */

/**
 * @swagger
 * /transacoes:
 *   post:
 *     summary: Cria uma nova transação.
 *     tags: [Transações]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovaTransacao'
 *     responses:
 *       201:
 *         description: "Transação criada com sucesso."
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transacao'
 *       400:
 *         description: "Erro de validação."
 *       500:
 *         description: "Erro interno do servidor."
 *   get:
 *     summary: Lista todas as transações do usuário autenticado, com filtros opcionais.
 *     tags: [Transações]
 *     parameters:
 *       - in: query
 *         name: id_subcategoria
 *         schema:
 *           type: integer
 *         description: "Filtro por ID da subcategoria."
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: integer
 *         description: "Filtro por tipo da transação (1: Entrada, 2: Saída, 3: Investimento)."
 *       - in: query
 *         name: data_inicial
 *         schema:
 *           type: string
 *           format: date
 *         description: "Filtro pela data inicial."
 *       - in: query
 *         name: data_final
 *         schema:
 *           type: string
 *           format: date
 *         description: "Filtro pela data final."
 *       - in: query
 *         name: valor_min
 *         schema:
 *           type: number
 *         description: "Filtro pelo valor mínimo."
 *       - in: query
 *         name: valor_max
 *         schema:
 *           type: number
 *         description: "Filtro pelo valor máximo."
 *     responses:
 *       200:
 *         description: "Lista de transações retornada com sucesso."
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transacao'
 *       500:
 *         description: "Erro interno do servidor."
 */

/**
 * @swagger
 * /transacoes/{id}:
 *   get:
 *     summary: Busca uma transação pelo ID.
 *     tags: [Transações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "ID da transação."
 *     responses:
 *       200:
 *         description: "Transação encontrada."
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transacao'
 *       404:
 *         description: "Transação não encontrada."
 *       500:
 *         description: "Erro interno do servidor."
 *   put:
 *     summary: Atualiza uma transação pelo ID.
 *     tags: [Transações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "ID da transação a ser atualizada."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovaTransacao'
 *     responses:
 *       200:
 *         description: "Transação atualizada com sucesso."
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transacao'
 *       404:
 *         description: "Transação não encontrada."
 *       500:
 *         description: "Erro interno do servidor."
 *   delete:
 *     summary: Realiza soft delete de uma transação.
 *     tags: [Transações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: "ID da transação a ser excluída."
 *     responses:
 *       200:
 *         description: "Transação excluída com sucesso."
 *       404:
 *         description: "Transação não encontrada."
 *       500:
 *         description: "Erro interno do servidor."
 */

const express = require('express');
const router = express.Router();
const transacaoController = require('../controllers/transacaoController');
const { validateBody } = require('../middlewares/validateMiddleware');
const { createTransactionSchema } = require('../validations/transacaoValidations');
const authMiddleware = require('../middlewares/authMiddleware');
const verifyUserMiddleware = require('../middlewares/verifyUserMiddleware');

router.use(authMiddleware);
router.use(verifyUserMiddleware);

// Rotas das transações
router.post('/', validateBody(createTransactionSchema), transacaoController.create);
router.get('/', transacaoController.findAll);
router.get('/:id', transacaoController.findOne);
router.put('/:id', transacaoController.update);
router.delete('/permanent/:id', transacaoController.delete);
router.delete('/:id', transacaoController.softDelete);

module.exports = router;
