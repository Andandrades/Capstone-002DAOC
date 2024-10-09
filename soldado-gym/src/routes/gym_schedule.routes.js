const { Router } = require("express");

const { getGymHours,createGymHour , updateGymHour, deleteGymHour, getSingleHour} = require("../controllers/gym_schedule.controllers");

const router = Router();


router.get("/gymHours",getGymHours);
router.post("/gymHours",createGymHour);
router.put("/gymHours/:id",updateGymHour);
router.delete("/gymHours/:id",deleteGymHour);
router.get("/gymHours/:id",getSingleHour);



module.exports = router;
