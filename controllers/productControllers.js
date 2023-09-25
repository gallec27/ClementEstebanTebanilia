const {
  saveProduct,
  readProducts,
  findProduct,
  checkProduct,
  deleteProduct,
} = require("../services/productServices");

const multer = require("multer");
const path = require("path");

// Configura la ubicación y el nombre de los archivos de imágenes cargadas
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/products/"); // Ruta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext); // Nombre de archivo único
  },
});

// Crea una instancia de multer con la configuración
const upload = multer({ storage });

const renderCart = (req, res) => {
  res.render("cart", { req });
};

const renderDetails = async (req, res) => {
  try {
    const productCodigo = req.params.codigo;
    const product = await findProduct(productCodigo);
    res.render("details", { req, product, errors: [] });
  } catch (error) {
    console.error(error);
    // Manejar el error apropiadamente
    res.status(500).send("Error al cargar la página");
  }
};

const renderCreate = (req, res) => {
  res.render("create-product", { req, errors: [] });
};

const registerProduct = async (req, res) => {
  //Destructuring
  const { codigo, nombre, detalle, precio, descripcion } = req.body;

  // Verifica si se cargó una imagen 
  if (!req.file) {
    return res.render("create-product", {
      req,
      errors: [{ msg: "Debes cargar una imagen." }],
    });
  }

  if (!(await checkProduct(codigo))) {
    const nuevoProducto = {
      codigo,
      nombre,
      detalle,
      precio,
      descripcion,
      imagen: req.file.filename,
    };

    await saveProduct(nuevoProducto);

    res.redirect("/admin/profile");
  } else {
    res.render("create-product", {
      req,
      errors: [{ msg: "Ya existe ese producto." }],
    });
  }
};

const renderListProduct = async (req, res) => {
  try {
    // Obtener todos los productos usando la función readProducts
    const products = await readProducts();

    // Renderizar la vista "list-product" y pasar los productos como variable
    res.render("list-product", { req, products });
  } catch (error) {
    console.error(error);
    // Manejar el error apropiadamente
    res.status(500).send("Error al cargar la página");
  }
};

const renderActionProduct = async (req, res) => {
  try {    
    const productCodigo = req.params.codigo;    
    const product = await findProduct(productCodigo);    
    res.render("action-product", { req, product, errors: [] });
  } catch (error) {
    console.error(error);
    // Manejar el error apropiadamente
    res.status(500).send("Error al cargar la página");
  }
};

const actionProduct = async (req, res) => {
  const accion = req.body.accion; // Lee el valor del botón clickeado  
  //Destructuring
  const { codigo, nombre, detalle, precio, descripcion } = req.body;

  if (accion === "guardar") {
    if (await checkProduct(codigo)) {      
      await deleteProduct(codigo);
    }

    const nuevoProducto = {      
      codigo,
      nombre,
      detalle,
      precio,
      descripcion,
      imagen: req.file.filename,
    };

    await saveProduct(nuevoProducto);
    const products = await readProducts();

    res.render("list-product", { req, products });
  } else if (accion === "eliminar") {
    await deleteProduct(codigo);
    const products = await readProducts();
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
