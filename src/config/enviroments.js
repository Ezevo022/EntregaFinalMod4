require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  DBPASSWORD: process.env.DBPASSWORD,
  JWTPASSWORD: process.env.JWTPASSWORD,
};
