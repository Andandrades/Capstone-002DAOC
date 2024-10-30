const { Router } = require("express");

const {
    createNutriHour,
    getAllNutriHour,
    getNutriHour,
    updateNutriHour,
    deleteNutriHour,
    getHoursByDate,
    scheduleHour,
    cancelHour
} = require("../controllers/nutri_schedule.controllers");


const router = Router();

router.get("/nutriSchedule",getAllNutriHour);

router.get("/nutriSchedule/:id",getNutriHour);

router.get("/nutriScheduleDate/:date",getHoursByDate);

router.post("/nutriSchedule",createNutriHour);

router.put("/nutriSchedule/:id",updateNutriHour);

router.delete("/nutriSchedule/:id",deleteNutriHour);

//Endpoints Cliente
router.patch("/nutriScheduleClient/:id",scheduleHour);
router.patch("/nutriScheduleClientcancel/:id",cancelHour);

module.exports = router;
