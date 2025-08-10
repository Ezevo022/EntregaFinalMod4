const { Router } = require("express");
const usuariosControllers = require("../controllers/usuarios.controller");

const router = Router();

router.get("/", usuariosControllers.getUsuarios);

module.exports = router;
