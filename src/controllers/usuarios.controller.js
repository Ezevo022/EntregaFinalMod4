const usuarioServices = require("../services/usuarios.services");

const login = async (req, res, next) => {
  try {
    const { body } = req;

    const token = await usuarioServices.login(body);

    res.status(200).json({ status: "success", token });
  } catch (error) {
    // res
    //   .status(401)
    //   .json({ status: "failure", message: "Faltan proveer las credenciales" });
    next(error);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", { path: "/" });
    res.redirect("/login");
  } catch (error) {}
};

const createUsuarios = (req, res, next) => {
  try {
    const { body } = req;

    const data = usuarioServices.create(body);

    res
      .status(200)
      .json({ status: "success", message: "Usuario creado", data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  logout,
  createUsuarios,
};
