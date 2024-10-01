//Archivo principal el cual arranca el servidor express
const express =require('express');
const morgan = require('morgan');



const rolesRoutes = require('./routes/roles.routes');
const usersRoutes = require('./routes/users.routes')
const rolesExercise = require('./routes/exercise.Routes');
const ExercisesRecords = require('./routes/exerciseHistory.Routes');
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
const nutriScheduleRoutes = require('./routes/nutri_schedule.routes')
=======
>>>>>>> Stashed changes
const schedule_classes = require('./routes/scheduleClases.routes');

>>>>>>> a79c53f4d8f8141f618939a4768f32e7a41424e1

const app = express();

app.use(morgan('dev'))

app.use(express.json())

app.use(rolesRoutes);
app.use(usersRoutes);
app.use(rolesExercise);
app.use(ExercisesRecords);
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
app.use(nutriScheduleRoutes)
=======
>>>>>>> Stashed changes
app.use(schedule_classes);

>>>>>>> a79c53f4d8f8141f618939a4768f32e7a41424e1

app.listen(3000)
console.log('Sever port: 3000')