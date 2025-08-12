const jwt = require("jsonwebtoken");
const enviroments = require("../config/enviroments");
const Usuario = require("../models/usuarios.model");

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

  const where = { email: body.email, password: body.password };

  const user = await Usuario.findOne({ where });

  if (!user) {
    throw new HttpError("Credenciales incorrectas", 401);
  }

  const userData = user.toJSON();
  delete userData.password;

  const token = jwt.sign(userData, enviroments.JWTPASSWORD, {
    expiresIn: "1h",
  });

  return token;
};

const create = async (body) => {
  if (!body?.name || !body?.email || !body?.password)
    throw new HttpError("Faltan campos para el registro", 422);
  const usuarioEncontrado = await Usuario.findOne({
    where: { email: body.email },
  });
  if (usuarioEncontrado) throw new HttpError("El email esta registrado", 409);
  return await Usuario.create(body);
};

const update = async (body) => {
  if (!body?.name || !body?.email || !body?.password)
    throw new HttpError("Faltan campos para actualizar", 422);
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
