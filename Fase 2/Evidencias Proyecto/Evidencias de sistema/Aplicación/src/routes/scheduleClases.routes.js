const { Router } = require("express");
const pool = require("../db");

const authenticateToken = require('../middlewares/authenticateToken')
const autorizeRole = require('../middlewares/authorizeRole')


//import de los controladores

const {  getAll, getbyid, create, update, deletebyid , getHourByGymId , scheduleHour , deleteHour ,getUserClasses,getNextClass} = require("../controllers/scheduleClases.controllers");

const router = Router();

const cors = require("cors");



// Configuración de CORS
const corsOptions = {
    origin: process.env.FRONTEND_URL, // URL de tu cliente
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos permitidos
    credentials: true, // Permitir cookies
};

router.get("/schedule",authenticateToken, autorizeRole([1,2,3,4]), getAll);
router.get("/schedule/:id",authenticateToken, autorizeRole([1,2,3,4]), getbyid);
router.get("/scheduleinfo/:id",authenticateToken, autorizeRole([1,2,3,4]), getHourByGymId);
router.post("/schedule", authenticateToken, autorizeRole([2,3,4]),create);
router.put("/schedule",authenticateToken, autorizeRole([2,4]), update);
router.delete("/schedule/:id",authenticateToken, autorizeRole([2,4]),deletebyid);
//Registrar asistencia (Endpoint usuarios)
router.post("/scheduleHour",authenticateToken, autorizeRole([1,2,3,4]), scheduleHour);
//Eliminar hora registrada(Endpoint usuarios)
router.delete("/scheduleHour/:class_id", authenticateToken, autorizeRole([1,2,3,4]),deleteHour);
//Conseguir horas de usuario
router.get("/scheduleHour/:id/:class_id",authenticateToken, autorizeRole([1,2,3,4]), getUserClasses);
router.get("/scheduleHour/:id/:class_id", authenticateToken, autorizeRole([1,2,3,4]),cors(corsOptions));
router.get("/scheduleNextClass/:id", authenticateToken, autorizeRole([1,2,3,4]),getNextClass);

router.options("/schedule/:id",authenticateToken, autorizeRole([1,2,3,4]), cors(corsOptions));

module.exports = router;
