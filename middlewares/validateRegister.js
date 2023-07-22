const { body, validationResult } = require("express-validator");

const validateRegister = [
  body("nombre").notEmpty().withMessage("Debe ingresar el nombre."),
  body("apellido").notEmpty().withMessage("Debe ingresar el Apellido."),
  body("fechaNac").notEmpty().withMessage("Debe ingresar fecha nacimiento."),
  body("email").isEmail().withMessage("Debe ingresar un mail válido."),
  body("password").notEmpty().withMessage("Debe ingresar la contraseña."),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Debe ingresar la confirmación de contraseña."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {      
      return res.render("register", {
        errors: errors.array(),
      });
    }

    next();
  },
];

module.exports = validateRegister;
