const express = require("express");
const router = express.Router();
const ProductoModel = require('../models/productos.model')

// Middleware para obtener la data de la petición GET en "/"
let productosData = [];

router.use('/', (req, res, next) => {
    productosData = []; // Reinicializa la variable para asegurarse de que esté vacía
    next();
});

//     NO PUEDO MOSTRAR LOS PRODUCTOS EN HANDLEBARS !!!!!!!!!!!!!!!!!!!!!!
router.get('/home', (req, res) => {
    res.render('productos', { productos: productosData });
});

router.get("/", async (req, res) => {
    try {
        const productosData = await ProductoModel.find()
        res.json(productosData)
        productosData = productosData
    } catch (error) {
        res.status(500).json({message: "Error al intentar acceder :("})
    }
   
})

router.get("/:id", async (req, res) => {
    const productoId = req.params.id
    try {
        const data = await ProductoModel.findById(productoId);
        if (!data) {
            res.status(404).json({ menssage: "no se encuentra producto ID" })
            return;
        } else {
            res.status(200).json(data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error al intentar accceder" })
    }
})

router.post("/", async (req, res) => {
    const { nombre, precio, descripcion } = req.body
    const document = { nombre, precio, descripcion }
    try {
        const nuevoProducto = new ProductoModel(document)
        await nuevoProducto.save()
        res.status(200).json({ mensaje: "Documento insertado con exito: ", document })
    } catch (error) {
        res.status(404).json({ mensaje: "NO SE HA PODIDO GUARDAR:", error })
    }
});

router.put("/:id", async (req, res) => {
    const nuevaInfo = req.body
    try {
        await ProductoModel.updateOne({ _id: req.params.id }, nuevaInfo)
        res.status(200).json({ message: "Producto modificado con EXITO", nuevaInfo })
    } catch (error) {
        res.status(500).json({ message: "no se ha podido modificar el producto" })
    }
})

module.exports = router;