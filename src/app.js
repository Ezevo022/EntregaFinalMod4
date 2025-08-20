const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const enviroments = require("./config/enviroments");
const usuariosRoutes = require("./routes/usuarios.routes");
const viewsRoutes = require("./routes/views.routes");
const sequelize = require("./config/db");
const handleErrors = require("./middlewares/error.middlewares");

const app = express();

const PORT = parseInt(enviroments.PORT);

app.listen(PORT, () => console.log("Server UP en port:", PORT));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use(cookieParser());

// Vistas para utilizar la API
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Prueba Conexion con DB
// const probarConexion = async () => {
//   try {
//     await sequelize.sync();

//     console.log("Conexion establecida");
//   } catch (error) {
//     console.log("Conexion fallida:", error);
//   }
// };

// probarConexion();

// Routes
app.use("/api/usuarios", usuariosRoutes);
app.use("/", viewsRoutes);

// Middleware de Errores
app.use(handleErrors);
