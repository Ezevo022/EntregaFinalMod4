const usuarioServices = require("../services/usuarios.services");

const login = async (req, res, next) => {
  try {
    const { body } = req;

    const token = await usuarioServices.login(body);

    res.status(200).json({ status: "success", token });
  } catch (error) {
    next(error);
  }
};

const getUsuario = async (req, res, next) => {
  try {
    const { name, email } = req.user;

    res.render("perfil.ejs", { name, email });
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
