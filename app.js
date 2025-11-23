const express = require("express");
const app = express();
app.use(express.json());

const loginCliente = require("./controllers/loginClienteController");
const loginRestaurante = require("./controllers/loginRestauranteController");

app.post("/login/cliente", loginCliente);
app.post("/login/restaurante", loginRestaurante);

module.exports = app;
