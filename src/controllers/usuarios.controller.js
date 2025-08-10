const usuarioServices = require("../services/usuarios.services");

const getUsuarios = async (req, res) => {
  try {
    const filters = req.query;

    const data = await usuarioServices.getAll({ ...filters });

    res.status(200).json(data);
  } catch (error) {}
};

const createUsuarios = (req, res) => {
  try {
    const { body } = req;

    const data = usuarioServices.create(body);

    res
      .status(200)
      .json({ status: "success", message: "Usuario creado", data });
  } catch (error) {}
};

module.exports = {
  getUsuarios,
  createUsuarios,
};
