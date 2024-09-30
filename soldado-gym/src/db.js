//Este archivo es la conexion a la base de datos PostgreSQL

//Pool nos deja crear la coneccion a la base de datos
const {Pool}= require('pg')

const {db} =  require('./config')

const pool = new Pool ({
    user : db.user,
    password: db.password,
    host : db.host,
    port : db.port,
    database : db.database
})

module.exports = pool;