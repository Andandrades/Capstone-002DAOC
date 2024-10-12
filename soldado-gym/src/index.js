//Archivo principal el cual arranca el servidor express
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

// Usar CORS
app.use(cors());



//importar Rutas
const rolesRoutes = require("./routes/roles.routes");
const usersRoutes = require("./routes/users.routes");
const rolesExercise = require("./routes/exercise.Routes");
const ExercisesRecords = require("./routes/exerciseHistory.Routes");
const nutriScheduleRoutes = require("./routes/nutri_schedule.routes");
const schedule_classes = require("./routes/scheduleClases.routes");
const transactionRoutes = require("./routes/transaction.routes");
const sesionRoutes = require("./routes/sesion.routes");
const plansRoutes = require("./routes/plans.Routes");
//Endpoint gym_schedule
const gymHoursRoutes = require("./routes/gym_schedule.routes");


app.use(morgan("dev"));

app.use(express.json());

app.use(cookieParser());

//Inicializar Rutas
app.use(rolesRoutes);
app.use(usersRoutes);
app.use(rolesExercise);
app.use(ExercisesRecords);
app.use(nutriScheduleRoutes);
app.use(schedule_classes);
app.use(transactionRoutes);
app.use(sesionRoutes);
app.use(plansRoutes);
app.use(gymHoursRoutes);


app.listen(3000);





console.log("Sever port: 3000");
