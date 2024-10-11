const { Router } = require("express");
const pool = require("../db");

//import de los controladores

const {  getAll, getbyid, create, update, deletebyid , getHourByGymId , getUserReservation} = require("../controllers/scheduleClases.controllers");

const router = Router();

const cors = require("cors");



// Configuración de CORS
const corsOptions = {
    origin: process.env.FRONTEND_URL, // URL de tu cliente
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos permitidos
    credentials: true, // Permitir cookies
};


router.get("/schedule", getAll);

router.options("/schedule", cors(corsOptions));

router.get("/schedule/:id", getbyid);

router.get("/schedulereserve/:userId/:gym_schedule_id", getUserReservation);

router.get("/scheduleinfo/:id", getHourByGymId);

router.post("/schedule", create);

router.put("/schedule", update);

router.delete("/schedule/:id", deletebyid);
router.options("/schedule/:id", cors(corsOptions));


module.exports = router;
