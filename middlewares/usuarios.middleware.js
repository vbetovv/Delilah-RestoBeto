const usuariosServicios = require('../servicios/usuarios.servicios.js');
const { jwt, firma } = require("../configuracion/configuracion.js");

function validarDatos(req, res, next) {

    console.log("Validando Datos Completos del Usuario");

    const { usuario, nombre, apellido, email, contrasena, telefono, domicilio } = req.body;

    if (!usuario || !nombre || !apellido || !email || !contrasena || !telefono || !domicilio) {

        res.status(400).json({
            error: `Datos Incompletos !`
        });

    } else {

        next();

    }

}


async function validarExistencia(req, res, next) {

    const usuariosServicios = require('../servicios/usuarios.servicios.js');

    console.log("Validando Usuario");

    const consultaUsuario = await usuariosServicios.buscarUsuario(req.body);

    console.log("Usuario encontrado : ", consultaUsuario);

    if (consultaUsuario.length > 0) { res.status(409).json(`El usuario ${req.body.usuario} ya existe en la base de datos`); }

    else { next(); }

}


function esAdmin(req, res, next) {

    const { jwt, firma } = require("../configuracion/configuracion.js");

    console.log("Validando si el usuario es Admin");

    const token = req.headers.authorization.split(' ')[1];

    if (!token) {

        res.status(401).json({ Error: "Token Invalido" });


    } else {

        const verificar = jwt.verify(token, firma)

        if (verificar.admin == 1) { next(); }
        else { res.status(401).json({ Error: "Token Invalido" }); }

    }


}

module.exports = { validarDatos, validarExistencia, esAdmin };
