const { body, validationResult } = require("express-validator");

const validatePers = [
  body("password")
    .isLength({ min: 6, max: 10 })
    .withMessage("La contraseña debe tener de 6 a 10 caracteres"),
  body("email").isEmail().withMessage("Debe ser un mail valido"),
  body("name").notEmpty().withMessage("El nombre no puede ser vacio"),

  (req, res, next) => {
    const errors = validationResult(req);

    // En caso de tener errores se concatenan para mostrar en un solo msj
    if (!errors.isEmpty()) {
      const error = new Error(
        errors
          .array()
          .map((err) => err.msg)
          .join(", ")
      );
      error.status = 422;
      return next(error);
    }

    next();
  },
];

module.exports = {
  validatePers,
};
