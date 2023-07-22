const express = require("express");

const { 
    renderCart,
    renderDetails,
    renderCreate,
    registerProduct,
    renderListProduct,
    renderActionProduct,
    actionProduct
} = require("../controllers/productControllers.js");
const validateProduct = require("../middlewares/validateProduct.js");

const router = express.Router();

router.get("/cart", renderCart);
router.get("/details", renderDetails);
router.get("/create", renderCreate);
router.post("/create", validateProduct, registerProduct);
router.get("/list", renderListProduct);
router.get('/action/:id', renderActionProduct);
router.post('/action', validateProduct, actionProduct);

module.exports = router;