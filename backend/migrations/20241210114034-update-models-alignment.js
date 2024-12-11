'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

       // Adicionar validação única para o campo 'nome' em categoria e subcategoria
       await queryInterface.addConstraint('categoria', {
         fields: ['nome', 'id_usuario'],
         type: 'unique',
         name: 'unique_categoria_nome_id_usuario',
       });
   
       await queryInterface.addConstraint('subcategoria', {
         fields: ['nome', 'id_categoria'],
         type: 'unique',
         name: 'unique_subcategoria_nome_id_categoria',
       });
   
       // Adicionar relacionamentos faltantes
       await queryInterface.addConstraint('transacao', {
         fields: ['id_recorrencia'],
         type: 'foreign key',
         name: 'fk_transacao_recorrencia',
         references: {
           table: 'recorrencia',
           field: 'id_recorrencia',
         },
         onDelete: 'SET NULL',
         onUpdate: 'CASCADE',
       });
   
       await queryInterface.addConstraint('agendamento', {
         fields: ['id_transacao'],
         type: 'foreign key',
         name: 'fk_agendamento_transacao',
         references: {
           table: 'transacao',
           field: 'id_transacao',
         },
         onDelete: 'CASCADE',
         onUpdate: 'CASCADE',
       });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('categoria', 'unique_categoria_nome_id_usuario');
    await queryInterface.removeConstraint('subcategoria', 'unique_subcategoria_nome_id_categoria');
    await queryInterface.removeConstraint('transacao', 'fk_transacao_recorrencia');
    await queryInterface.removeConstraint('agendamento', 'fk_agendamento_transacao');
    await queryInterface.renameColumn('transacao', 'data_exlusao', 'data_exclusao');
  }
};
