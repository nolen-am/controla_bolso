'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('categoria', 'usuario_id', 'id_usuario');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('categoria', 'id_usuario', 'usuario_id');
  }
};
