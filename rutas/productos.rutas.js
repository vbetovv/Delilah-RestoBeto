const { validarDatos, validarExistencia, validarDatosEditar } = require('../middlewares/productos.middleware.js');
const { esAdmin } = require('../middlewares/usuarios.middleware.js');
const productosServicios = require('../servicios/productos.servicios.js');

module.exports = (app) => {

    app.get("/v1/productos/", async (req, res) => {

        console.log("peticion GET a : /v1/productos/ ");

        try {

            const consultaProductos = await productosServicios.buscarProducto(req.body);

            if (consultaProductos.length > 0) { res.status(200).json(consultaProductos); }

            else { res.status(404).json("El producto no Existe"); }

        } catch (error) { res.status(500).json({ Error: error.message }); }

    });

    app.post("/v1/productos/", esAdmin, validarDatos, validarExistencia, async (req, res) => {

        console.log("peticion POST a : /v1/productos/ ");

        const crearProducto = await productosServicios.crearProducto(req.body);

        if (crearProducto.length > 0) {
            res.status(201).json({
                mensaje: `Producto ${req.body.nombre} creado correctamente ! `
            });
        }

        else { res.status(400).json({ mensaje: "Error al Crear Producto" }); }

    });


    app.put("/v1/productos/", esAdmin, validarDatosEditar, async (req, res) => {

        console.log("peticion PUT a : /v1/productos/ ");

        console.log("Validando Producto");

        const consultaProducto = await productosServicios.buscarProductoPorId(req.body);

        if (consultaProducto.length > 0) {

            const editarProducto = await productosServicios.editarProducto(req.body);

            if (editarProducto.length > 0) {
                res.status(201).json({
                    mensaje: `Producto ${req.body.nombre} editado correctamente ! `
                });
            }

        }

        else { res.status(400).json({ mensaje: "Error al Editar Producto" }); }

    });

    app.delete("/v1/productos/", esAdmin, validarDatos, async (req, res) => {

        console.log("peticion DELETE a : /v1/productos/ ");

        console.log("Validando Producto");

        const consultaProducto = await productosServicios.buscarProductoPorId(req.body);

        if (consultaProducto.length > 0) {

            const eliminarProducto = await productosServicios.eliminarProducto(req.body);

            res.status(201).json({
                mensaje: `Producto ${req.body.nombre} eliminado correctamente ! `
            });

        }

        else { res.status(400).json({ mensaje: "Error al Eliminar Producto" }); }

    });


}