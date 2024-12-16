const { Router } = require("express");
const pool = require("../db");

const authenticateToken = require('../middlewares/authenticateToken')
const autorizeRole = require('../middlewares/authorizeRole')


//import de los controladores

const {  getAll, getbyid, create, update, deletebyid , getHourByGymId , scheduleHour , deleteHour ,getUserClasses,getNextClass, getNextConsultation} = require("../controllers/scheduleClases.controllers");

const router = Router();

router.get("/schedule",authenticateToken, autorizeRole([1,2,3,4]), getAll);
router.get("/schedule/:id",authenticateToken, autorizeRole([1,2,3,4]), getbyid);
router.get("/scheduleinfo/:id", getHourByGymId);
router.post("/schedule", authenticateToken, autorizeRole([2,3,4]),create);
router.put("/schedule",authenticateToken, autorizeRole([2,4]), update);
router.delete("/schedule/:id",authenticateToken, autorizeRole([2,4]),deletebyid);
//Registrar asistencia (Endpoint usuarios)
router.post("/scheduleHour", scheduleHour);
//Eliminar hora registrada(Endpoint usuarios)
router.delete("/scheduleHour/:class_id", authenticateToken, autorizeRole([1,2,3,4]),deleteHour);
//Conseguir horas de usuario
router.get("/scheduleHour/:id/:class_id",authenticateToken, autorizeRole([1,2,3,4]), getUserClasses);
router.get("/scheduleHour/:id/:class_id", authenticateToken, autorizeRole([1,2,3,4]));
router.options("/schedule/:id",authenticateToken, autorizeRole([1,2,3,4]));

router.get("/scheduleNextClass/:id",getNextClass);
router.get("/scheduleNextConsultation/:id", getNextConsultation);

module.exports = router;
