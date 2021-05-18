const SeqLibrary = require("sequelize");

const conn =

{
    DATABASE: 'delilah',
    DIALECT: 'mysql',
    HOST: '192.168.1.146',
    PASSWORD: 'Acamica123',
    USERNAME: 'acamica'
}


const sequelize = new SeqLibrary(conn.DATABASE, conn.USERNAME, conn.PASSWORD, {
    host: conn.HOST,
    dialect: conn.DIALECT,
});

sequelize.authenticate().then(() => {
    console.log("Conectado a la base de datos");
}).catch(err => {
    console.error("Error de conexion" + err);
})/*.finally( ()=> {
    sequelize.close();
})*/;

const jwt = require('jsonwebtoken');
const firma = "LaPalabraMasica2020";

const m = new Date();
const ahora = m.getUTCFullYear() +"/"+ (m.getUTCMonth()+1) +"/"+ m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();


module.exports = { sequelize, jwt, firma, ahora };
