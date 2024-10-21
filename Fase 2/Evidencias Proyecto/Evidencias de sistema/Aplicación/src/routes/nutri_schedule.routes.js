const { Router } = require("express");

const {
    createNutriHour,
    getAllNutriHour,
    getNutriHour,
    updateNutriHour,
    deleteNutriHour,
    getHoursByDate
} = require("../controllers/nutri_schedule.controllers");


const router = Router();

router.get("/nutriSchedule",getAllNutriHour);

router.get("/nutriSchedule/:id",getNutriHour);

router.get("/nutriScheduleDate/:date",getHoursByDate);

router.post("/nutriSchedule",createNutriHour);

router.put("/nutriSchedule/:id",updateNutriHour);

router.delete("/nutriSchedule/:id",deleteNutriHour);

module.exports = router;
