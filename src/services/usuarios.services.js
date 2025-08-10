const Usuario = require("../models/usuarios.model");

const getAll = async (filters) => {
  const where = {};

  if (filters.name) where.name = filters.name;
  if (filters.email) where.email = filters.email;

  return await Usuario.findAll({ where });
};
const create = async (body) => await Usuario.create(body);

module.exports = {
  getAll,
  create,
};
