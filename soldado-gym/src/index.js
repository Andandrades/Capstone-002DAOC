//Archivo principal el cual arranca el servidor express
const express =require('express');
const morgan = require('morgan');

const rolesRoutes = require('./routes/roles.routes');
const usersRoutes = require('./routes/users.routes')
const rolesExercise = require('./routes/exercise.Routes');
const ExercisesRecords = require('./routes/exerciseHistory.Routes');
const schedule_classes = require('./routes/scheduleClases.routes');



const app = express();

app.use(morgan('dev'))

app.use(express.json())

app.use(rolesRoutes);
app.use(usersRoutes);
app.use(rolesExercise);
app.use(ExercisesRecords);
app.use(schedule_classes);


app.listen(3000)
console.log('Sever port: 3000')