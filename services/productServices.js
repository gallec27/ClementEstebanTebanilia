const  Product = require('../models/product'); // Importa tu modelo de producto

// Función para guardar un nuevo producto en la base de datos
async function saveProduct(nuevoProducto) {
  try {
    const producto = await Product.create(nuevoProducto);
    return producto;
  } catch (error) {
    throw error;
  }
}

// Función para buscar un producto por su ID
async function findProduct(id) {
  try {
    const producto = await Product.findByPk(id);
    return producto;
  } catch (error) {
    throw error;
  }
}

// Función para eliminar un producto por su ID
async function deleteProduct(id) {
  try {
    const producto = await Product.findByPk(id);
    if (producto) {
      await producto.destroy();
    }
  } catch (error) {
    throw error;
  }
}

// Función para verificar si un producto existe por su ID
async function checkProduct(id) {
  try {
    const producto = await Product.findByPk(id);
    return producto !== null;
  } catch (error) {
    throw error;
  }
}

// Función para leer todos los productos de la base de datos
async function readProducts() {
  try {
    console.log(Product);
    const productos = await Product.findAll();
    return productos;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  saveProduct,
  findProduct,
  deleteProduct,
  checkProduct,
  readProducts
};
