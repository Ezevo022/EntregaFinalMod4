const { Router } = require("express");
const usuariosControllers = require("../controllers/usuarios.controller");

const router = Router();

router.post("/login", usuariosControllers.login);
router.post("/register", usuariosControllers.createUsuarios);
router.get("/logout", usuariosControllers.logout);

module.exports = router;
