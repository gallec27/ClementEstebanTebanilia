const productService = require('../services/productServices');

const renderIndex = async (req, res) => {
  try {
    // Obtener todos los productos usando la función readProducts
    const productos = await productService.readProducts();
    
    // Renderizar la vista "index" y pasar los productos como variable
    res.render("index", { req, productos });
  } catch (error) {
    console.error(error);
    // Manejar el error apropiadamente
    res.status(500).send("Error al cargar la página");
  }
};

module.exports = {
  renderIndex
};
