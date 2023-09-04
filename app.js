const express = require("express");
const exphbs = require("express-handlebars");
const productosRoutes = require("./src/routes/productos.routes"); // Ruta relativa al archivo de rutas
const usuariosRoutes = require("./src/routes/usuarios.routes")
const app = express();
const db = require('./src/db')
db()

app.use(express.json())

// config view engine
app.engine("hbs", exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs"
}))

app.set("view engine", "hbs")

app.get('/', (req, res) => {
    res.render("home")
})

app.use("/productos", productosRoutes);
app.use("/usuarios", usuariosRoutes)

app.listen(8080, () => {
    console.log("SERVIDOR INICIADO EN PUERTO 8080");
});