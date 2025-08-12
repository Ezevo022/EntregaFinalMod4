function handleErrors(err, req, res, next) {
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    status: "failure",
    message: err.message || "Error interno del servidor",
  });
}

module.exports = handleErrors;
