const jwt = require("jsonwebtoken");
const enviroments = require("../config/enviroments");
const Usuario = require("../models/usuarios.model");

const login = async (body) => {
  if (!body?.name || !body?.password) {
    throw new Error("Faltan proveer las credenciales");
  }

  const where = { name: body.name, password: body.password };

  const user = await Usuario.findOne({ where });

  if (!user) {
    throw new Error("Credenciales incorrectas");
  }

  const userData = user.toJSON();
  delete userData.password;

  const token = jwt.sign(userData, enviroments.JWTPASSWORD, {
    expiresIn: "1h",
  });

  return token;
};

const create = async (body) => {
  const usuarioEncontrado = await Usuario.findOne({
    where: { email: body.email },
  });
  if (usuarioEncontrado) throw new Error("El email esta registrado");
  await Usuario.create(body);
};

module.exports = {
  login,
  create,
};
