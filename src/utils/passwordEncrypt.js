const bcrypt = require("bcrypt");
const hashs = 10;

const hashPass = (password) => bcrypt.hashSync(password, hashs);

const comparePass = (password1, password2) =>
  bcrypt.compareSync(password1, password2);

module.exports = {
  hashPass,
  comparePass,
};
