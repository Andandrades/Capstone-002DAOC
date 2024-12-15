const { Router } = require("express");

const authenticateToken = require('../middlewares/authenticateToken')
const autorizeRole = require('../middlewares/authorizeRole')

const { createNutriHour, getAllNutriHour, getNutriHour, updateNutriHour, deleteNutriHour, getHoursByDate, scheduleHour, cancelHour, createMultiHour, dragUpdate, getAvalibleSchedule , getNextHour } = require("../controllers/nutri_schedule.controllers");


const router = Router();

router.get("/nutriSchedule",authenticateToken, autorizeRole([1,2,3,4]), getAllNutriHour);

router.get("/GetAvalibleNutriSchedule",authenticateToken, autorizeRole([1,2,3,4]), getAvalibleSchedule);

router.get("/getNextHour",authenticateToken, autorizeRole([1,2,3,4]), getNextHour);

router.get("/nutriSchedule/:id",authenticateToken, autorizeRole([1,2,3,4]), getNutriHour);

router.get("/nutriScheduleDate/:date", authenticateToken, autorizeRole([1,2,3,4]),getHoursByDate);

router.post("/nutriSchedule/bulk", authenticateToken, autorizeRole([3,4]), createMultiHour)

router.post("/nutriSchedule", authenticateToken, autorizeRole([3,4]),  createNutriHour);

router.put("/nutriSchedule/:id",authenticateToken, autorizeRole([3,4]),  updateNutriHour);

router.put("/nutriScheduleDrag/update",authenticateToken, autorizeRole([3,4]),  dragUpdate);

router.delete("/nutriSchedule/:id",authenticateToken, autorizeRole([3,4]),  deleteNutriHour);

//Endpoints Cliente
router.patch("/nutriScheduleClient/:id",authenticateToken, autorizeRole([1,2,3,4]),  scheduleHour);
router.patch("/nutriScheduleClientcancel/:id", authenticateToken, autorizeRole([1,2,3,4]),  cancelHour);

module.exports = router;
