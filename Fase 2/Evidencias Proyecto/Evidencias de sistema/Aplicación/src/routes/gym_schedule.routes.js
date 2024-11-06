const { Router } = require("express");

const { getGymHours,getHoursByDate, createGymHour , updateGymHour, deleteGymHour, getSingleHour , getHourByDay , updateActualCap , copyClassesToDays} = require("../controllers/gym_schedule.controllers");

const router = Router();

const cors = require("cors");



// Configuración de CORS
const corsOptions = {
    origin: process.env.FRONTEND_URL, // URL de tu cliente
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"], // Métodos permitidos
    credentials: true, // Permitir cookies
};
  
router.get("/gymHours",getGymHours);
router.get("/gymHoursDate/:date",getHoursByDate);
router.post("/gymHours",createGymHour);
router.options("/gymHours/:id",cors(corsOptions));
router.put("/gymHours/:id",updateGymHour);
router.patch("/gymHours/:id",updateActualCap);
router.delete("/gymHours/:id",deleteGymHour);
router.get("/gymHours/:id",getSingleHour);
router.get("/gymHoursDay/:day",getHourByDay);
router.get("/gymHoursDay/:day",cors(corsOptions));

//Endpoint para crear copia de horas de un dia
router.post("/gymHoursCopy",copyClassesToDays);


module.exports = router;
