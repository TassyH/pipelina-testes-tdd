const validarCampos = require("../services/validarCampos");
const restaurantes = require("../services/mockRestaurantes");

module.exports = (req, res) => {
  const { user, senha } = req.body;

  const erro = validarCampos(user, senha);
  if (erro) return res.status(400).json({ erro });

  const rest = restaurantes.find(r => r.user === user);

  if (!rest || rest.senha !== senha || rest.ativo !== true) {
    return res.status(401).json({ erro: "Credenciais inválidas" });
  }

  return res.status(200).json({ token: "TOKEN_RESTAURANTE" });
};
