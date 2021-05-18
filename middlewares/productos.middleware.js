const productosServicios = require('../servicios/productos.servicios.js');

function validarDatos(req, res, next) {

    console.log("Validando Datos del Producto");

    const { nombre, descripcion, precio, imagen } = req.body;

    if (!nombre || !descripcion || !precio || !imagen) {

        res.status(404).json({
            error: `Datos Incompletos !`
        });

    } else {

        next();

    }

}

function validarDatosEditar(req, res, next) {

    console.log("Validando Datos para editar Producto");

    const { id, nombre, descripcion, precio, imagen } = req.body;

    if (!id || !nombre || !descripcion || !precio || !imagen) {

        res.status(404).json({
            error: `Datos Incompletos !`
        });

    } else {

        next();

    }

}

async function validarExistencia(req, res, next) {

    const productosServicios = require('../servicios/productos.servicios.js');

    console.log("Validando Producto");

    const consultaProducto = await productosServicios.buscarProducto(req.body);

    console.log("Producto encontrado : ", consultaProducto);

    if (consultaProducto.length > 0) { res.status(409).json(`El Producto ${req.body.nombre} ya existe en la base de datos`); }

    else { next(); }

}


module.exports = { validarDatos, validarExistencia, validarDatosEditar };