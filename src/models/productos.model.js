// iniciar por consola del sistema "mongod"
const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    descripcion: String,
});

const ProductoModel = mongoose.model('Producto', productoSchema);
// El primer argumento de mongoose.model es el nombre que deseas darle al modelo (en este caso, "Producto"), y el segundo argumento es el esquema que deseas asociar con el modelo.

module.exports = ProductoModel;

