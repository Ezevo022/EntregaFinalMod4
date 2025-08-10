const { Sequelize } = require("sequelize");
const enviroments = require("./enviroments");

const sequelize = new Sequelize("usuariostf", "root", enviroments.DBPASSWORD, {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
