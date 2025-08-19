const usuarioServices = require("../services/usuarios.services");

const login = async (req, res, next) => {
  try {
    const { body } = req;

    const token = await usuarioServices.login(body);

    // Se setea la cookie desde la API para hacerla mas segura
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // en producción debería ser true (HTTPS)
      maxAge: 1000 * 60 * 60,
    });
    res.status(200).json({ status: "success" });
  } catch (error) {
    next(error);
  }
};

const getUsuario = (req, res, next) => {
  try {
    const { name, email } = req.user;
    res.json({ name, email });
  } catch (error) {
    next(error);
  }
};

const createUsuarios = async (req, res, next) => {
  try {
    const { body } = req;

    const data = await usuarioServices.create(body);

    res
      .status(200)
      .json({ status: "success", message: "Usuario creado", data });
  } catch (error) {
    next(error);
  }
};

const updateUsuario = async (req, res, next) => {
  try {
    const { body } = req;

    const data = await usuarioServices.update(body);

    res
      .status(200)
      .json({ status: "success", message: "Usuario actualizado", data });
  } catch (error) {
    next(error);
  }
};

const deleteUsuario = async (req, res, next) => {
  try {
    const { body } = req;

    const data = await usuarioServices.deleteUser(body);

    res
      .status(200)
      .json({ status: "success", message: "Usuario borrado", data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  getUsuario,
  createUsuarios,
  updateUsuario,
  deleteUsuario,
};
