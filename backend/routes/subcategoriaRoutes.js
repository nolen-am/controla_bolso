/**
 * @swagger
 * tags:
 *   name: Subcategorias
 *   description: Gerenciamento de subcategorias.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NovaSubcategoria:
 *       type: object
 *       required:
 *         - nome
 *         - id_categoria
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome da subcategoria.
 *           example: Mercado
 *         descricao:
 *           type: string
 *           description: Descrição da subcategoria.
 *           example: Gastos com compras no supermercado.
 *         id_categoria:
 *           type: integer
 *           description: ID da categoria associada.
 *           example: 1
 *         status:
 *           type: boolean
 *           description: Status da subcategoria (ativo ou inativo).
 *           example: true
 *     Subcategoria:
 *       allOf:
 *         - $ref: '#/components/schemas/NovaSubcategoria'
 *         - type: object
 *           properties:
 *             id_subcategoria:
 *               type: integer
 *               description: ID da subcategoria.
 *               example: 1
 *             data_criacao:
 *               type: string
 *               format: date-time
 *               description: Data de criação da subcategoria.
 *               example: 2024-12-22T00:00:00Z
 */

/**
 * @swagger
 * /subcategorias:
 *   post:
 *     summary: Cria uma nova subcategoria.
 *     tags: [Subcategorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovaSubcategoria'
 *     responses:
 *       201:
 *         description: Subcategoria criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subcategoria'
 *       400:
 *         description: Erro de validação.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /subcategorias/categoria/{id_categoria}:
 *   get:
 *     summary: Lista subcategorias associadas a uma categoria.
 *     tags: [Subcategorias]
 *     parameters:
 *       - in: path
 *         name: id_categoria
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da categoria.
 *     responses:
 *       200:
 *         description: Lista de subcategorias retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subcategoria'
 *       404:
 *         description: Nenhuma subcategoria encontrada.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /subcategorias/{id}:
 *   get:
 *     summary: Busca uma subcategoria pelo ID.
 *     tags: [Subcategorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da subcategoria.
 *     responses:
 *       200:
 *         description: Subcategoria encontrada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subcategoria'
 *       404:
 *         description: Subcategoria não encontrada.
 *       500:
 *         description: Erro interno do servidor.
 *   put:
 *     summary: Atualiza uma subcategoria pelo ID.
 *     tags: [Subcategorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da subcategoria.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovaSubcategoria'
 *     responses:
 *       200:
 *         description: Subcategoria atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subcategoria'
 *       400:
 *         description: Erro de validação.
 *       404:
 *         description: Subcategoria não encontrada.
 *       500:
 *         description: Erro interno do servidor.
 *   delete:
 *     summary: Exclui (soft delete) uma subcategoria.
 *     tags: [Subcategorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da subcategoria.
 *     responses:
 *       200:
 *         description: Subcategoria excluída com sucesso.
 *       404:
 *         description: Subcategoria não encontrada.
 *       500:
 *         description: Erro interno do servidor.
 */

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
