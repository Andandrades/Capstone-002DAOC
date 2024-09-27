//Archivo principal el cual arranca el servidor express
const express =require('express');
const morgan = require('morgan');

const rolesRoutes = require('./routes/roles.routes');

const app = express();

app.use(morgan('dev'))

app.use(express.json())

app.use(rolesRoutes);

app.listen(3000)
console.log('Sever port: 3000')