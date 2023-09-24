// sequelize-config.js
const Sequelize = require('sequelize');

const sequelize = new Sequelize('tebanilia', 'root', 'Frankce_051078*ECF', {
  host: 'localhost', // Cambia esto a la dirección de tu servidor MySQL si es necesario
  dialect: 'mysql',
});

module.exports = sequelize;
