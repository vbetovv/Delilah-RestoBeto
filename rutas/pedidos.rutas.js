const pedidosServicios = require('../servicios/pedidos.servicios.js');
const { validarDatos, existePedido } = require('../middlewares/pedidos.middleware.js');
const { esAdmin } = require('../middlewares/usuarios.middleware.js');
const { jwt, firma } = require("../configuracion/configuracion.js");

module.exports = (app) => {

    app.get("/v1/pedidos/", async (req, res) => {

        console.log("peticion GET a : /v1/pedidos/ ");

        console.log("Validando El tipo de Usuario");

        const token = req.headers.authorization.split(' ')[1];

        const verificar = jwt.verify(token, firma)

        if (verificar.admin == 1) { pedidos = await pedidosServicios.mostrarPedidos(req.body); }

        else { pedidos = await pedidosServicios.buscarPedidoPorUsuario(verificar.id); }

        try {

            const listadoPedidos = await pedidosServicios.listadoPedidos(pedidos);

            res.status(200).json(listadoPedidos);

        } catch (error) { res.status(500).json({ Error: error.message }); }

    });

    app.post("/v1/pedidos/", validarDatos, async (req, res) => {

        console.log("peticion POST a : /v1/pedidos/ ");

        const crearPedido = await pedidosServicios.crearPedido(req.body);

        if (crearPedido.length > 0) {

            const detallePedido = await pedidosServicios.detallePedido(req.body, crearPedido[0]);

            if (detallePedido.length > 0) {

                res.status(201).json({
                    mensaje: `Pedido creado correctamente ! `
                });

            }

            else { res.status(400).json({ mensaje: "Error al Crear Pedido" }); }

        }

        else { res.status(400).json({ mensaje: "Error al Crear Pedido" }); }

    });

    app.put("/v1/pedidos/", esAdmin, existePedido, async (req, res) => {

        console.log("peticion PUT a : /v1/pedidos/ ");

        console.log("Validando Datos para editar Pedido");

        const { estado, id_pedido } = req.body;

        if (!estado || !id_pedido) {

            res.status(400).json({ error: `Datos Incompletos !` });

        } else {

            const editarPedido = await pedidosServicios.editarPedido(req.body);

            if (editarPedido.length > 0) {

                res.status(201).json({ mensaje: `Pedido editado correctamente ! ` });

            }

            else { res.status(400).json({ mensaje: "Error al Editar Pedido" }); }

        }

    });

    app.delete("/v1/pedidos/", esAdmin, existePedido, async (req, res) => {

        console.log("peticion DELETE a : /v1/pedidos/ ");

        console.log("Validando Datos para eliminar Pedido");

        const id_pedido = req.body.id_pedido;

        if (!id_pedido) {

            res.status(400).json({ error: `Datos Incompletos !` });

        } else {

            const eliminarPedido = await pedidosServicios.eliminarPedido(req.body);

            res.status(201).json({ mensaje: `Pedido Eliminado correctamente ! ` });

        }

    });

}