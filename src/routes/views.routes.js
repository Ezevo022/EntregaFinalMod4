const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.render("index.ejs");
});

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

// Se realiza un fetch en la ruta para usar la API y asi
// aislar lo que es el render y solo usar la respuesta
router.get("/mi-usuario", async (req, res, next) => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/usuarios/mi-usuario",
      {
        headers: { cookie: req.headers.cookie },
      }
    );

    if (response.status === 401) {
      // El token no está o es inválido se redirige
      return res.redirect("/login");
    }

    const usuario = await response.json();
    const { name, email } = usuario;
    res.render("perfil.ejs", { name, email });
  } catch (error) {
    next(error);
  }
});

router.get("/logout", (req, res, next) => {
  try {
    res.clearCookie("token", { path: "/" });
    res.redirect("/login");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
