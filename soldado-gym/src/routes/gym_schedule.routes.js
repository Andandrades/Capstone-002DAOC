const { Router } = require("express");

const { getGymHours,createGymHour , updateGymHour, deleteGymHour, getSingleHour , getHourByDay} = require("../controllers/gym_schedule.controllers");

const router = Router();

const cors = require("cors");



// Configuración de CORS
const corsOptions = {
    origin: process.env.FRONTEND_URL, // URL de tu cliente
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos permitidos
    credentials: true, // Permitir cookies
};
  
router.get("/gymHours",getGymHours);
router.post("/gymHours",createGymHour);
router.put("/gymHours/:id",updateGymHour);
router.delete("/gymHours/:id",deleteGymHour);
router.get("/gymHours/:id",getSingleHour);
router.get("/gymHoursDay/:day",getHourByDay);
router.get("/gymHoursDay/:day",cors(corsOptions));



module.exports = router;
