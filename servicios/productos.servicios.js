const { sequelize } = require("../configuracion/configuracion.js");

module.exports.buscarProducto = async (objProducto) => {

    const nombre = {
        nombre: `%${objProducto.nombre}%`
    };

    if (objProducto.nombre) {
        query = "SELECT * FROM productos WHERE nombre LIKE :nombre ";
    } else {
        query = "SELECT * FROM productos";
    }

    const respuesta =
        sequelize.query(query, {
            replacements: nombre,
            type: sequelize.QueryTypes.SELECT
        });

    return respuesta;

}

module.exports.buscarProductoPorId = async (objProducto) => {

    if (objProducto.id) {

        query = "SELECT * FROM productos WHERE id = :id";

        const respuesta =
            sequelize.query(query, {
                replacements: { id: objProducto.id },
                type: sequelize.QueryTypes.SELECT
            });

        return respuesta;
    }

}

module.exports.crearProducto = async (objProducto) => {

    const { nombre, precio, imagen, descripcion } = objProducto;

    if (nombre) {

        query = "INSERT INTO productos (nombre, precio, imagen, descripcion) VALUES (:nombre, :precio, :imagen, :descripcion) ";

        const respuesta =
            sequelize.query(query, {
                replacements: { nombre, precio, imagen, descripcion },
                type: sequelize.QueryTypes.INSERT
            });

        return respuesta;
    }

}


module.exports.editarProducto = async (objProducto) => {

    const { nombre, precio, imagen, descripcion, id } = objProducto;

    if (id) {

        query = "UPDATE productos SET nombre = :nombre , precio = :precio, imagen = :imagen  ,descripcion = :descripcion WHERE id = :id";

        const respuesta =
            sequelize.query(query, {
                replacements: { nombre, precio, imagen, descripcion, id },
                type: sequelize.QueryTypes.UPDATE
            });

        return respuesta;

    }

}


module.exports.eliminarProducto = async (objProducto) => {

    const id = objProducto.id;

    if (id) {

        query = "DELETE FROM productos WHERE id = :id";

        const respuesta =
            sequelize.query(query, {
                replacements: { id },
                type: sequelize.QueryTypes.DELETE
            });

        return respuesta;

    }

}