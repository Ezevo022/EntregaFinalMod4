const { Router } = require("express");
const { isLogin } = require("../middlewares/auth.middlewares");

const router = Router();

router.get("/", (req, res) => {
  res.render("index.ejs");
});

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.get("/ver", (req, res) => {
  res.send(`nombre: ${req.signedCookies.nombre}`);
});

router.get("/eliminar", (req, res) => {
  res.clearCookie("nombre");
  res.send("Cookie Eliminada");
});

router.get("/mi-usuario", isLogin, (req, res) => {
  const { name, email } = req.user;

  res.render("perfil.ejs", { name, email });
});

module.exports = router;
