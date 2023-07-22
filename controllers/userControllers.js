const bcrypt = require("bcrypt");
const fs = require("fs");
const { saveUser, findUser, checkUser } = require("../services/userServices");

const renderLogin = (req, res) => {
  res.render("login", { errors: [] });
};

const renderRegister = (req, res) => {
  res.render("register", { errors: [] });
};

const registerUser = (req, res) => {
  //Destructuring  
  const { nombre, apellido, fechaNac, email, password } = req.body;

  // buscar en el array de usuarios el que coincida con el email, si ninguno coincide, enviar un error
  if (!checkUser(email)) {
    // Generar un salt (valor aleatorio) para fortalecer el hashing
    const saltRounds = 10;
    // Aplicar el hashing de la contraseña utilizando bcrypt
    bcrypt.hash(password, saltRounds, (error, hashedPassword) => {
      if (error) {        
        res.status(500).send("Error al hashear la contraseña.");
        return;
      }
      // Crear un objeto con el email y la contraseña hasheada
      const nuevoUsuario = {
        nombre,
        apellido,
        fechaNac,
        email,
        password: hashedPassword, // Guardar la contraseña hasheada en lugar de la original
        nivelAcceso: "client",
      };

      saveUser(nuevoUsuario);

      // Guardar el valor del usuario recién registrado en la sesión
      req.session.usuario = nuevoUsuario;

      res.redirect("/");
    });
  } else {
    //res.send("Ya existe ese usuario.");
    res.render("register", { errors : [{ msg: "Ya existe ese usuario." }] })
  }
};

const login = (req, res) => {  
  const { email, password } = req.body;

  // buscar en el array de usuarios el que coincida con el email, si ninguno coincide, enviar un error
  const usuarioOk = findUser(email);
  if (usuarioOk) {
    bcrypt.compare(password, usuarioOk.password, (error, result) => {
      if (error) {        
        return res.status(400).send("Error al comparar la contraseña.");
      }
      // result solo va a ser TRUE o FALSE
      if (result) {
        // Guardar el valor del usuario recién logueado en la sesión
        req.session.usuario = usuarioOk;

        if (usuarioOk.nivelAcceso === "client") {
          res.redirect("/");
        } else if (usuarioOk.nivelAcceso === "admin") {
          // redireccionar al perfil
          res.render("profile", { req });
        }
      } else {
        //  renderizar una vista con el error
        res.render("login", { errors : [{ msg: "Contraseña incorrecta." }] });
      }
    });
  } else {
    const errors = [{ msg: "El usuario no existe." }];
    return res.render("login", { errors });
  }
};

const logout = (req, res) => {
  req.session.usuario = null;
  res.redirect('/');
}

module.exports = {
  renderLogin,
  renderRegister,
  registerUser,
  login,
  logout
};
