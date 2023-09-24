const { body, validationResult } = require("express-validator");

const validateProduct = [
  body("codigo")
    .notEmpty()
    .withMessage("Debe ingresar el código."),
  body("nombre").notEmpty().withMessage("Debe ingresar el nombre."),
  body("precio")
    .notEmpty()
    .withMessage("Debe ingresar el precio.")
    .isCurrency()
    .withMessage("Debe ingresar un precio correcto."),
  body("descripcion").notEmpty().withMessage("Debe ingresar la descripción."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {      
      return res.render("create-product", {
        req,
        errors: errors.array(),
      });
    }

    next();
  },
];

module.exports = validateProduct;
