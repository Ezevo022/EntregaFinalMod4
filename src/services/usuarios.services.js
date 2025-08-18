const jwt = require("jsonwebtoken");
const enviroments = require("../config/enviroments");
const Usuario = require("../models/usuarios.model");
const { hashPass, comparePass } = require("../utils/passwordEncrypt");

// Se crea clase para crear mas facil errores

class HttpError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const login = async (body) => {
  if (!body?.email || !body?.password) {
    throw new HttpError("Faltan proveer las credenciales", 401);
  }

  const where = { email: body.email };

  const user = await Usuario.findOne({ where });

  if (!user) throw new HttpError("Credenciales incorrectas", 401);

  const userData = user.toJSON();

  if (!comparePass(body.password, userData.password))
    throw new HttpError("Credenciales incorrectas", 401);

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
  if (usuarioEncontrado) throw new HttpError("El email esta registrado", 409);

  body.password = hashPass(body.password);
  return await Usuario.create(body);
};

const update = async (body) => {
  body.password = hashPass(body.password);
  return await Usuario.update(body, { where: { email: body.email } });
};

const deleteUser = async (body) => {
  if (!body?.email)
    throw new HttpError("Usuario no encontrado para eliminar", 404);
  return await Usuario.destroy({ where: { email: body.email } });
};

module.exports = {
  login,
  create,
  update,
  deleteUser,
};
