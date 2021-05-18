const { sequelize, firma } = require("../configuracion/configuracion.js");

module.exports.buscarUsuario = async (objUsuario) => {

    if (objUsuario.usuario) {
        query = "SELECT * FROM usuarios WHERE usuario = :usuario";
    } else {
        query = "SELECT * FROM usuarios";
    }

    const respuesta =
        sequelize.query(query, {
            replacements: { usuario: objUsuario.usuario },
            type: sequelize.QueryTypes.SELECT
        });

    return respuesta;

}

module.exports.crearUsuario = async (objUsuario) => {

    const { usuario, nombre, apellido, email, contrasena, telefono, domicilio } = objUsuario;

    if (usuario) {

        query = "INSERT INTO usuarios (usuario, nombre, apellido, email, contrasena, telefono, domicilio) VALUES (:usuario, :nombre, :apellido, :email, :contrasena, :telefono, :domicilio ) ";

        const respuesta =
            sequelize.query(query, {
                replacements: { usuario, nombre, apellido, email, contrasena, telefono, domicilio },
                type: sequelize.QueryTypes.INSERT
            });

        return respuesta;

    }

}


module.exports.editarUsuario = async (objUsuario) => {

    const { usuario, nombre, apellido, email, contrasena, telefono, domicilio } = objUsuario;

    if (usuario) {

        query = "UPDATE usuarios SET nombre = :nombre , apellido = :apellido, email = :email ,contrasena = :contrasena, telefono = :telefono , domicilio = :domicilio WHERE usuario = :usuario";

        const respuesta =
            sequelize.query(query, {
                replacements: { usuario, nombre, apellido, email, contrasena, telefono, domicilio },
                type: sequelize.QueryTypes.UPDATE
            });

        return respuesta;

    }

}


module.exports.eliminarUsuario = async (objUsuario) => {

    const usuario = objUsuario.usuario;

    if (usuario) {

        query = "DELETE FROM usuarios WHERE usuario = :usuario";

        const respuesta =
            sequelize.query(query, {
                replacements: { usuario },
                type: sequelize.QueryTypes.DELETE
            });

        return respuesta;

    }

}