const fs = require("fs");
const path = require("path");

function getPath() {
  const filePath = path.join(__dirname, "..", "data", "products.json");
  return filePath;
}

function saveProduct(nuevoProducto) {
  const productos = readProducts();
  productos.push(nuevoProducto);
  const stringifiedProducts = JSON.stringify(productos, null, 2);
  const result = fs.writeFileSync(getPath(), stringifiedProducts, "utf8");
  return result;
}

function readProducts() {
  const productsParsed = JSON.parse(fs.readFileSync(getPath(), "utf-8"));
  return productsParsed;
}

function findProduct(id) {
  const products = readProducts();  
  const productFinded = products.find((pr) => pr.id === id);

  return productFinded;
}

function deleteProduct(id) {
  const products = readProducts();

  // Encontrar el índice del producto con el ID proporcionado
  const productIndex = products.findIndex((product) => product.id === id);

  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    fs.writeFileSync(getPath(), JSON.stringify(products, null, 2), "utf8");
  }
}

function checkProduct(id) {
  const products = readProducts();
  const productFinded = products.some((pr) => pr.id === id);  
  return productFinded;
}

module.exports = {
  saveProduct,
  readProducts,
  findProduct,
  checkProduct,
  deleteProduct
};
