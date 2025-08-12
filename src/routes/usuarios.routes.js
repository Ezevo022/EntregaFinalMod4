const { Router } = require("express");
const usuariosControllers = require("../controllers/usuarios.controller");
const { isLogin } = require("../middlewares/auth.middlewares");

const router = Router();

router.get("/mi-usuario", isLogin, usuariosControllers.getUsuario);
router.post("/login", usuariosControllers.login);
router.post("/register", usuariosControllers.createUsuarios);
router.put("/update", isLogin, usuariosControllers.updateUsuario);
router.delete("/delete", isLogin, usuariosControllers.deleteUsuario);

module.exports = router;
