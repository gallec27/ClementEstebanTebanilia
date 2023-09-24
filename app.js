const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 3000;

const sequelize = require('./config/sequelize-config');
/*const Product = require('./models/product');
const Category = require('./models/category');
const User = require('./models/user');*/

// Sincronizar los modelos con la base de datos
sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos conectada y modelos sincronizados.');
});

//middlewares
app.set("view engine", "ejs");
app.use(express.static("public")); //carpeta publica para archivos estaticos (css, js, img, etc)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurar cookie-parser
app.use(cookieParser());

// Configurar express-session
app.use(
  session({
    secret: "tebanilia_sabores", 
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Configura a true si estás utilizando HTTPS
      httpOnly: true,
      maxAge: 3600000, // Tiempo de expiración de la cookie en milisegundos (aquí se establece a 1 hora)
    },
  })
);



app.use("/", require("./routes/indexRoutes"));

app.use("/products", require("./routes/productRoutes"));

app.use("/user", require("./routes/userRoutes"));

app.use("/admin", require("./routes/adminRoutes"));

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`)
});