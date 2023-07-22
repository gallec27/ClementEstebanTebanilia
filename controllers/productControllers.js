const fs = require("fs");
const {
  saveProduct,
  readProducts,
  findProduct,
  checkProduct,
  deleteProduct,
} = require("../services/productServices");

const renderCart = (req, res) => {
  res.render("cart", { req });
};

const renderDetails = (req, res) => {
  res.render("details", { req });
};

const renderCreate = (req, res) => {
  res.render("create-product", { req, errors: [] });
};

const registerProduct = (req, res) => {
  //Destructuring
  const { id, nombre, precio, descripcion } = req.body;
  
  if (!checkProduct(id)) {
    const nuevoProducto = {
      id,
      nombre,
      precio,
      descripcion,
    };

    saveProduct(nuevoProducto);

    res.redirect("/admin/profile");
  } else {
    res.render("create-product", {
      req,
      errors: [{ msg: "Ya existe ese producto." }],
    });
  }
};

const renderListProduct = (req, res) => {
  const products = readProducts();
  res.render("list-product", { req, products });
};

const renderActionProduct = (req, res) => {
  const productId = req.params.id;
  const product = findProduct(productId);
  res.render("action-product", { req, product, errors: [] });
};

const actionProduct = (req, res) => {
  const accion = req.body.accion; // Lee el valor del botón clickeado
  const productoId = req.body.id; // Lee el valor del campo ID del producto

  if (accion === "guardar") {    
    //Destructuring
    const { id, nombre, precio, descripcion } = req.body;

    if (checkProduct(id)) {
      deleteProduct(productoId);
    }

    const nuevoProducto = {
      id,
      nombre,
      precio,
      descripcion,
    };

    saveProduct(nuevoProducto);
    const products = readProducts();

    res.render("list-product", { req, products });
  } else if (accion === "eliminar") {
    deleteProduct(productoId);
    const products = readProducts();
    res.render("list-product", { req, products });
  }
};

module.exports = {
  renderCart,
  renderDetails,
  renderCreate,
  registerProduct,
  renderListProduct,
  renderActionProduct,
  actionProduct,
};
