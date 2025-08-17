const { Router } = require("express");
const usuariosControllers = require("../controllers/usuarios.controller");
const { isLogin } = require("../middlewares/auth.middlewares");
const { validatePers } = require("../middlewares/validator.middlewares");

const router = Router();

// Se inserta middlewares para login y validacion de entradas en las
// rutas que asi lo requieren

router.get("/mi-usuario", isLogin, usuariosControllers.getUsuario);
router.post("/login", usuariosControllers.login);
router.post("/register", validatePers, usuariosControllers.createUsuarios);
router.put("/update", validatePers, isLogin, usuariosControllers.updateUsuario);
router.delete("/delete", isLogin, usuariosControllers.deleteUsuario);

module.exports = router;
