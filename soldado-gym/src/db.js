//Este archivo es la conexion a la base de datos PostgreSQL

//Pool nos deja crear la coneccion a la base de datos
const {Pool}= require('pg')

const pool = new Pool ({
    user : 'postgres',
    password: 'admin',
    host : 'localhost',
    port : '5432',
    database : 'soldadogym'
})

module.exports = pool;