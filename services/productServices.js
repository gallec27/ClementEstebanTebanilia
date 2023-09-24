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
async function findProduct(cod) {
  try {
    console.log("EL PUTO CODIGO QUE NO LLEGA: " + cod);
    const producto = await Product.findOne({
      where: { codigo: cod }
    });
    return producto;
  } catch (error) {
    throw error;
  }
}

// Función para eliminar un producto por su CODIGO
async function deleteProduct(cod) {
  try {
    const producto = await Product.findOne({
      where: { codigo: cod }
    });
    if (producto) {
      await producto.destroy();
    }
  } catch (error) {
    throw error;
  }
}

// Función para verificar si un producto existe por su CODIGO
async function checkProduct(cod) {
  try {
    const producto = await Product.findOne({
      where: { codigo: cod }
    });
    return producto !== null;
  } catch (error) {
    throw error;
  }
}

// Función para leer todos los productos de la base de datos
async function readProducts() {
  try {    
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
