const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuração inicial:
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Controla Bolso API',
      version: '1.0.0',
      description: "Documentação das API's do sistema Controla Bolso",
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      schemas: {
        NovoUsuario: {
          type: 'object',
          required: ['nome_usuario', 'email', 'senha'],
          properties: {
            nome_usuario: {
              type: 'string',
              description: 'Nome do usuário.',
              example: 'João Silva',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'E-mail do usuário.',
              example: 'joao.silva@email.com',
            },
            senha: {
              type: 'string',
              format: 'password',
              description: 'Senha do usuário.',
              example: '12345678',
            },
            primeiro_nome: {
              type: 'string',
              description: 'Primeiro nome do usuário.',
              example: 'João',
            },
            ultimo_nome: {
              type: 'string',
              description: 'Último nome do usuário.',
              example: 'Silva',
            },
          },
        },
        Usuario: {
          type: 'object',
          properties: {
            id_usuario: {
              type: 'integer',
              description: 'ID único do usuário.',
              example: 1,
            },
            nome_usuario: {
              type: 'string',
              description: 'Nome do usuário.',
              example: 'João Silva',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'E-mail do usuário.',
              example: 'joao.silva@email.com',
            },
            primeiro_nome: {
              type: 'string',
              description: 'Primeiro nome do usuário.',
              example: 'João',
            },
            ultimo_nome: {
              type: 'string',
              description: 'Último nome do usuário.',
              example: 'Silva',
            },
            data_criacao: {
              type: 'string',
              format: 'date-time',
              description: 'Data e hora de criação do usuário.',
              example: '2024-12-18T10:15:30Z',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

// Gerando a documentação com base nas configurações acima
const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
