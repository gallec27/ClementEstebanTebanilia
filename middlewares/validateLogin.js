const { body, validationResult } = require("express-validator");

const validateLogin = [
  body("email")
    .isEmail()
    .withMessage("Debe ingresar un mail válido.")
    .bail(),
  body("password")
    .notEmpty()
    .withMessage("Debe ingresar la contraseña.")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {      
      return res.render("login", {
        errors: errors.array()
      });
    }

    next();
  }
];

module.exports = validateLogin;
