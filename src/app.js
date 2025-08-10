const express = require("express");
const enviroments = require("./config/enviroments");
const usuariosRoutes = require("./routes/usuarios.routes");
const sequelize = require("./config/db");

const app = express();

const PORT = parseInt(enviroments.PORT);

app.listen(PORT, () => console.log("Server UP en port:", PORT));

// Middlewares
app.use(express.json());

const probarConexion = async () => {
  try {
    await sequelize.sync();

    console.log("Conexion establecida");
  } catch (error) {
    console.log("Conexion fallida:", error);
  }
};

probarConexion();

// Routes
app.use("/api/usuarios", usuariosRoutes);
