const express = require("express");
const app = express();
const cors = require("cors");
const { config } = require('dotenv');
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");
const axios = require("axios");

config();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [process.env.FRONTEND_URL];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true); // Permite el origen
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
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
const subscription = require("./routes/subscription.routes");
const mailer = require("./routes/Mailer.Routes");
const dashboard = require("./routes/dashboard.routes");
const nextClassesRemember = require("./routes/rememberSchedule.routes");

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
app.use(dashboard);
app.use(nextClassesRemember);

// Programar tarea para ejecutar la ruta todos los días a las 12:00
cron.schedule("0 12 * * *", async () => {
  console.log("Ejecutando recordatorio de clases del día siguiente");
  try {
    const URL = process.env.VITE_API_URL;
    const response = await axios.get(`${URL}/next-day`);
    const responseNutri = await axios.get(`${URL}/next-schedule`);
    res.status(200).json({ message: "Recordatorio ejecutado con éxito" });
  } catch (error) {
    console.error("Error al ejecutar el recordatorio manualmente:", error.message);
    res.status(500).json({ message: "Error al ejecutar el recordatorio", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
