const mongoose = require('mongoose')

const conexion = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/detodounpoco')
        .then(() => console.log('Conectado correctamente a la base de datos'))
        .catch((error) => console.log("NO se pudo conectar a la BD", error));
}

module.exports = conexion