const jwt = require("jsonwebtoken");
const enviroments = require("../config/enviroments");

// Middleware para verificar si el usuario esta logeado correctamente
const isLogin = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token)
    return res.status(401).json({
      status: "failure",
      message: "No se encontró un token. Debes iniciar sesión.",
    });

  jwt.verify(token, enviroments.JWTPASSWORD, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        status: "failure",
        message: "Token inválido o expirado.",
      });
    }

    req.user = decoded;
    next();
  });
};

module.exports = {
  isLogin,
};
