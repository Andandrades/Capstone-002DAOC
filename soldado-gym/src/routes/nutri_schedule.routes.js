const { Router } = require("express");

const {
    createNutriHour,
    getAllNutriHour,
    getNutriHour,
    updateNutriHour,
    deleteNutriHour
} = require("../controllers/nutri_schedule.controllers");


const router = Router();

router.get("/nutriSchedule",getAllNutriHour);

router.get("/nutriSchedule/:id",getNutriHour);

router.post("/nutriSchedule",createNutriHour);

router.put("/nutriSchedule/:id",updateNutriHour);

router.delete("/nutriSchedule/:id",deleteNutriHour);

module.exports = router;
