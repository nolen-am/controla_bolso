const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { validateBody } = require('../middlewares/validateMiddleware');
const { createUserSchema, updateUserSchema } = require('../validations/usuarioValidations');
const authenticateToken = require('../middlewares/authMiddleware');
const verifyUserMiddleware = require('../middlewares/verifyUserMiddleware');

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de usuários.
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário.
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoUsuario'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 usuario:
 *                   $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Dados inválidos.
 *       500:
 *         description: Erro no servidor.
 */

// Rota aberta para a criação de um novo usuários
router.post(
  '/',
  validateBody(createUserSchema), 
  usuarioController.create,
);

// Middlewares para rotas de usuário
router.use(authenticateToken);
router.use(verifyUserMiddleware);

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários.
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de todos os usuários cadastrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Erro no servidor.
 */

// Rotas de usuario
router.get(
  '/',
  usuarioController.findAll
);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Busca um usuário por ID.
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário.
 *     responses:
 *       200:
 *         description: Dados do usuário.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro no servidor.
 */
router.get(
  '/:id',
   usuarioController.findOne
);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualiza um usuário por ID.
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AtualizarUsuario'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 usuarioAtualizado:
 *                   $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro no servidor.
 */
router.put(
  '/:id',
  validateBody(updateUserSchema),
  usuarioController.update
);


/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Deleta um usuário por ID.
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário.
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro no servidor.
 */
router.delete(
  '/:id',
  usuarioController.delete
);

// Rota protegida
router.get('/protegida', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Acesso permitido!', user: req.user });
})

module.exports = router;
