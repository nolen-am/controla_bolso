/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Gerenciamento de categorias.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NovaCategoria:
 *       type: object
 *       required:
 *         - nome
 *         - id_usuario
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome da categoria.
 *           example: Alimentação
 *         descricao:
 *           type: string
 *           description: Descrição da categoria.
 *           example: Gastos com alimentos e refeições.
 *         id_usuario:
 *           type: integer
 *           description: ID do usuário associado.
 *           example: 1
 *         status:
 *           type: boolean
 *           description: Status da categoria (ativo ou inativo).
 *           example: true
 *     Categoria:
 *       allOf:
 *         - $ref: '#/components/schemas/NovaCategoria'
 *         - type: object
 *           properties:
 *             id_categoria:
 *               type: integer
 *               description: ID da categoria.
 *               example: 1
 *             data_criacao:
 *               type: string
 *               format: date-time
 *               description: Data de criação da categoria.
 *               example: 2024-12-22T00:00:00Z
 */

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Cria uma nova categoria.
 *     tags: [Categorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovaCategoria'
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       400:
 *         description: Erro de validação.
 *       500:
 *         description: Erro interno do servidor.
 *   get:
 *     summary: Lista todas as categorias de um usuário.
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário.
 *     responses:
 *       200:
 *         description: Lista de categorias retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categoria'
 *       404:
 *         description: Nenhuma categoria encontrada.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /categorias/{id}:
 *   put:
 *     summary: Atualiza uma categoria existente.
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da categoria.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovaCategoria'
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       400:
 *         description: Erro de validação.
 *       404:
 *         description: Categoria não encontrada.
 *       500:
 *         description: Erro interno do servidor.
 *   delete:
 *     summary: Exclui (soft delete) uma categoria.
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da categoria.
 *     responses:
 *       200:
 *         description: Categoria excluída com sucesso.
 *       404:
 *         description: Categoria não encontrada.
 *       500:
 *         description: Erro interno do servidor.
 */

const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const { validateBody } = require('../middlewares/validateMiddleware');
const { createCategoriaSchema, updateCategoriaSchema } = require('../validations/categoriaValidations');
const authenticateToken = require('../middlewares/authMiddleware');
const verifyUserMiddleware = require('../middlewares/verifyUserMiddleware');

// Aplica autenticação e verificação de usuário globalmente
router.use(authenticateToken);
router.use(verifyUserMiddleware);

// Rotas para Categorias
router.post(
  '/',
  validateBody(createCategoriaSchema),
  categoriaController.create
);

router.get(
  '/:id_usuario',
  categoriaController.findAll
);

router.put(
  '/:id',
  validateBody(updateCategoriaSchema),
  categoriaController.update
);

router.delete(
  '/:id',
  categoriaController.softDelete
);

module.exports = router;
