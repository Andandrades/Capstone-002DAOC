const express = require("express");
const app = express();
const cors = require("cors");
const { config } = require('dotenv');
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

config(); 

const corsOptions = {
  origin: process.env.FRONTEND_URL, 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"], 
};

app.use(cors(corsOptions));

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Importar Rutas
const rolesRoutes = require("./routes/roles.routes");
const usersRoutes = require("./routes/users.routes");
const rolesExercise = require("./routes/exercise.Routes");
const ExercisesRecords = require("./routes/exerciseHistory.Routes");
const nutriScheduleRoutes = require("./routes/nutri_schedule.routes");
const schedule_classes = require("./routes/scheduleClases.routes");
const sesionRoutes = require("./routes/sesion.routes");
const plansRoutes = require("./routes/plans.Routes");
const Nutri = require("./routes/nutri.Routes");
const gymHoursRoutes = require("./routes/gym_schedule.routes");
const webpay = require("./routes/Webpay.Routes");
const subscription = require("./routes/subscription.routes")
const mailer = require("./routes/Mailer.Routes")

// Inicializar Rutas
app.use(rolesRoutes);
app.use(usersRoutes);
app.use(rolesExercise);
app.use(ExercisesRecords);
app.use(Nutri);
app.use(nutriScheduleRoutes);
app.use(schedule_classes);
app.use(sesionRoutes);
app.use(plansRoutes);
app.use(gymHoursRoutes);
app.use(webpay);
app.use(subscription);
app.use(mailer);


// Puerto del servidor
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
