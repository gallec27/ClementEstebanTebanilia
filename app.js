const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Tebanilia - Home");
});

app.get("/index", (req, res) => {
    res.send("Tebanilia - Inicio");
});

app.get("/details", (req, res) => {
    res.send("Tebanilia - Detalle");
});

app.get("/cart", (req, res) => {
    res.send("Tebanilia - Compra");
});

app.get("/login", (req, res) => {
    res.send("Tebanilia - Ingreso");
});

app.get("/register", (req, res) => {
    res.send("Tebanilia - Registro");
});

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`)
});