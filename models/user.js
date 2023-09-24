const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

const User = sequelize.define('tb_users', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fechaNac: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Asegura que el email sea único
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nivelAcceso: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true, // Esto habilitará los campos createdAt y updatedAt
});

module.exports = User;
