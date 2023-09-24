const express = require("express");
const router = express.Router();
const productController = require("../controllers/productControllers");
const validateProduct = require("../middlewares/validateProduct");

// Importa Multer
const multer = require("multer");

// Configura la ubicación y el nombre de los archivos de imágenes cargadas
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/products/"); // Ruta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = file.originalname.split(".").pop(); // Obtén la extensión del archivo original
    cb(null, uniqueSuffix + "." + ext); // Nombre de archivo único con extensión
  },
});

// Crea una instancia de multer con la configuración
const upload = multer({ storage });

router.get("/cart", productController.renderCart);
router.get("/details", productController.renderDetails);

// Utiliza Multer como middleware en la ruta de creación de productos
router.get("/create", productController.renderCreate);
router.post("/create", upload.single("imagen"), validateProduct, productController.registerProduct);

router.get("/list", productController.renderListProduct);
router.get('/action/:codigo', productController.renderActionProduct);
router.post('/action/', upload.single("imagen"), validateProduct, productController.actionProduct);

module.exports = router;
