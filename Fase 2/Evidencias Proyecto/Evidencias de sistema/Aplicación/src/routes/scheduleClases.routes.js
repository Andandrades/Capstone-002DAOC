const { Router } = require("express");
const pool = require("../db");

//import de los controladores

const {  getAll, getbyid, create, update, deletebyid , getHourByGymId , scheduleHour , deleteHour ,getUserClasses,getNextClass, getNextConsultation} = require("../controllers/scheduleClases.controllers");

const router = Router();

const cors = require("cors");



// Configuración de CORS
const corsOptions = {
    origin: process.env.FRONTEND_URL, // URL de tu cliente
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos permitidos
    credentials: true, // Permitir cookies
};

router.get("/schedule", getAll);
router.get("/schedule/:id", getbyid);
router.get("/scheduleinfo/:id", getHourByGymId);
router.post("/schedule", create);
router.put("/schedule", update);
router.delete("/schedule/:id", deletebyid);
//Registrar asistencia (Endpoint usuarios)
router.post("/scheduleHour", scheduleHour);
//Eliminar hora registrada(Endpoint usuarios)
router.delete("/scheduleHour/:class_id", deleteHour);
//Conseguir horas de usuario
router.get("/scheduleHour/:id/:class_id", getUserClasses);
router.get("/scheduleHour/:id/:class_id", cors(corsOptions));
router.get("/scheduleNextClass/:id", getNextClass);
router.get("/scheduleNextConsultation/:id", getNextConsultation);

router.options("/schedule/:id", cors(corsOptions));

module.exports = router;
