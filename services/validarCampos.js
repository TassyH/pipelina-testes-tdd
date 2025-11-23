function validarCampos(user, senha) {
  if (!user || !senha) {
    return "Campos obrigatórios";
  }
  return null;
}

module.exports = validarCampos;