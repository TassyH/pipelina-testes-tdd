const validarCampos = require("../services/validarCampos");
const clientes = require("../services/mockClientes");

module.exports = (req, res) => {
  const { user, senha } = req.body;

  const erro = validarCampos(user, senha);
  if (erro) return res.status(400).json({ erro });

  const cliente = clientes.find(c => c.user === user);

  if (!cliente || cliente.senha !== senha || cliente.ativo !== true) {
    return res.status(401).json({ erro: "Credenciais inválidas" });
  }

  return res.status(200).json({ token: "TOKEN_CLIENTE" });
};
