const jwt = require("jsonwebtoken");
const enviroments = require("../config/enviroments");

const isLogin = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) return res.redirect("/login");

  jwt.verify(token, enviroments.JWTPASSWORD, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        status: "Failure",
        message: "Token INVALIDO",
        error: error.message,
      });
    }

    req.user = decoded;
    next();
  });
};

module.exports = {
  isLogin,
};
