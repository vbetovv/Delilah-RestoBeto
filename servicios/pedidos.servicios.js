const { sequelize, ahora } = require("../configuracion/configuracion.js");


module.exports.mostrarPedidos = async (objPedido) => {

    if (objPedido) {

        query = "SELECT * FROM pedidos ";

        const respuesta =
            sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT
            });

            return respuesta;

    }
}

module.exports.buscarPedidoPorUsuario = async (id_usuario) => {

    if (id_usuario) {

        query = "SELECT * FROM pedidos WHERE id_usuario = :id_usuario";

        const respuesta =
            sequelize.query(query, {
                replacements: { id_usuario },
                type: sequelize.QueryTypes.SELECT
            });

        return respuesta;


    }

}

module.exports.existenciaPedido = async (id_pedido) => {

    if (id_pedido) {

        query = "SELECT * FROM pedidos WHERE id = :id_pedido";

        const respuesta =
            sequelize.query(query, {
                replacements: { id_pedido },
                type: sequelize.QueryTypes.SELECT
            });

        return respuesta;


    }

}

module.exports.crearPedido = async (objPedido) => {

    const fecha_pedido = ahora;
    const fecha_estado = ahora;

    const { total, id_usuario } = objPedido;

    query = "INSERT INTO pedidos (total, id_usuario, estado, fecha_pedido, fecha_estado) VALUES (:total, :id_usuario, 'pedido', :fecha_pedido, :fecha_estado) ";

    const respuesta =
        sequelize.query(query, {
            replacements: { total, id_usuario, fecha_pedido, fecha_estado },
            type: sequelize.QueryTypes.INSERT
        });

    return respuesta;



}


module.exports.detallePedido = async (objPedido, id_pedido) => {

    const { productos } = objPedido;

    productos.forEach(function (item, index) {

        const nombre_producto = item.nombre_producto;
        const id_producto = item.id_producto;
        const cantidad = item.cantidad;
        const precio = item.precio;

        query = "INSERT INTO detalle_pedidos (id_pedido, id_producto, nombre_producto, cantidad, precio) VALUES (:id_pedido, :id_producto, :nombre_producto, :cantidad, :precio) ";

        const respuesta =
            sequelize.query(query, {
                replacements: { id_pedido, id_producto, nombre_producto, cantidad, precio },
                type: sequelize.QueryTypes.INSERT
            });

    });



    return "ok";

}

module.exports.editarPedido = async (objPedido) => {

    const fecha_pedido = ahora;
    const { estado, id_pedido } = objPedido;

    if (estado && id_pedido) {

        query = "UPDATE pedidos SET estado = :estado , fecha_pedido = :fecha_pedido  WHERE id = :id_pedido";

        const respuesta =
            sequelize.query(query, {
                replacements: { estado, id_pedido, fecha_pedido },
                type: sequelize.QueryTypes.UPDATE
            });

        return respuesta;

    }

}

module.exports.eliminarPedido = async (objPedido) => {

    const id_pedido = objPedido.id_pedido;

    if (id_pedido) {

        query = "DELETE FROM pedidos WHERE id = :id_pedido";

        const respuesta =
            sequelize.query(query, {
                replacements: { id_pedido },
                type: sequelize.QueryTypes.DELETE
            });

        query = "DELETE FROM detalle_pedidos WHERE id_pedido = :id_pedido";

        const respuesta1 =
            sequelize.query(query, {
                replacements: { id_pedido },
                type: sequelize.QueryTypes.DELETE
            });



        return respuesta1;

    }

}

async function mostrarDetallePedido(id_pedido){

    if (id_pedido) {

        query = "SELECT * FROM detalle_pedidos WHERE id_pedido = :id_pedido";

        const respuesta =
            sequelize.query(query, {
                replacements: { id_pedido },
                type: sequelize.QueryTypes.SELECT
            });

            return respuesta;

    }
}


module.exports.listadoPedidos = async (pedidos) => {

        console.log("Recibo Listado de Pedidos");
    
        const arrayPedidos = [];

        for (p = 0 ; p <= pedidos.length - 1 ; p++ ){

            const detalle_pedido = await mostrarDetallePedido(pedidos[p].id);
    
                                let pedido ={
                                    "id":pedidos[p].id,
                                    "id_usuario": pedidos[p].id_usuario,
                                    "total" : pedidos[p].total,
                                    "fecha": pedidos[p].fecha_pedido,
                                    "estado": pedidos[p].estado,
                                    "fecha_estado" : pedidos[p].fecha_estado,
                                    "productos": detalle_pedido };
        
                arrayPedidos.push(pedido);

        }

        return arrayPedidos;

}