const usuariosServicios = require('../servicios/usuarios.servicios.js');
const { jwt, firma } = require("../configuracion/configuracion.js");
const { validarDatos, validarExistencia, esAdmin } = require('../middlewares/usuarios.middleware.js');

module.exports = (app) => {

    app.get("/v1/usuarios/", async (req, res) => {

        console.log("peticion GET a : /v1/usuarios/ ");

        try {

            const consultaUsuario = await usuariosServicios.buscarUsuario(req.body);
            const usuario = consultaUsuario.map(({ id, usuario, nombre, apellido }) => { return { id, usuario, nombre, apellido } });

            if (consultaUsuario.length > 0) { res.status(200).json(usuario); }

            else { res.status(404).json("El usuario no existe"); }

        } catch (error) { res.status(500).json({ Error: error.message }); }

    });

    app.post("/v1/usuarios/", validarDatos, validarExistencia, async (req, res) => {

        console.log("peticion POST a : /v1/usuarios/ ");

        const crearUsuario = await usuariosServicios.crearUsuario(req.body);

        if (crearUsuario.length > 0) {
            res.status(201).json({
                mensaje: `Usuario ${req.body.usuario} creado correctamente ! `
            });
        }

        else { res.status(400).json({ mensaje: "Error al Crear Usuario" }); }

    });

    app.put("/v1/usuarios/", esAdmin, validarDatos, async (req, res) => {

        console.log("peticion PUT a : /v1/usuarios/ ");

        console.log("Validando Si existe el Usuario");

        const consultaUsuario = await usuariosServicios.buscarUsuario(req.body);

        if (consultaUsuario.length > 0) {

            const editarUsuario = await usuariosServicios.editarUsuario(req.body);

            if (editarUsuario.length > 0) {
                res.status(201).json({
                    mensaje: `Usuario ${req.body.usuario} editado correctamente ! `
                });
            }

        }

        else { res.status(400).json({ mensaje: "Error al Editar Usuario" }); }

    });

    app.delete("/v1/usuarios/", esAdmin, async (req, res) => {

        console.log("peticion DELETE a : /v1/usuarios/ ");

        console.log("Validando Si existe el Usuario");

        const consultaUsuario = await usuariosServicios.buscarUsuario(req.body);

        if (consultaUsuario.length > 0) {

            const eliminarUsuario = await usuariosServicios.eliminarUsuario(req.body);

            res.status(201).json({
                mensaje: `Usuario ${req.body.usuario} eliminado correctamente ! `
            });

        }

        else { res.status(400).json({ mensaje: "Error al Eliminar Usuario" }); }

    });

    app.post("/v1/ingreso/", async (req, res) => {

        console.log("Usuario Quiere Ingresar : /v1/ingreso/ ");

        const { usuario, contrasena } = req.body;

        if (!usuario || !contrasena) {

            res.status(404).json({
                error: `Datos Incompletos !`
            });

        } else {

            const usuBus = await usuariosServicios.buscarUsuario(req.body);

            if (usuBus.length > 0 && usuario == usuBus[0].usuario && contrasena == usuBus[0].contrasena) {

                console.log("Enviando Token");

                const informacion = { usuario: usuario, admin: usuBus[0].admin, id: usuBus[0].id };
                const algoritmo = { algorithm: "HS512", expiresIn: 120000 }
                const token = jwt.sign(informacion, firma, algoritmo);

                res.status(200).json({
                    mensaje: 'Autenticación correcta',
                    token: token
                });

            } else {
                res.status(401).json({ error: "Usuario o Contrasena incorrecta" });
            }

        }

    });

}