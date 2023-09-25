const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');
const Category = require('./category');

const Product = sequelize.define('tb_products', {
  codigo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  detalle: {
    type: DataTypes.STRING,
  },
  precio: {
    type: DataTypes.DOUBLE(8, 2),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  timestamps: true // Esto habilitará los campos createdAt y updatedAt
});

Product.belongsTo(Category, { foreignKey: 'id_cat' });

module.exports = Product;
