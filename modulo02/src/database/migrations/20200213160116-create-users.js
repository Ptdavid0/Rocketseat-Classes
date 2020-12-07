'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false, // Nao permitir valor nulo
        autoIncrement: true, //Ter o auto incremento de valor
        primaryKey: true, // Ser a primary key
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      provider: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },

      //Armazenar a data de criacao
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,

      },
      //Armazenar data de edicao
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

  },

  down: (queryInterface) => {

    return queryInterface.dropTable('users');

  }
};
