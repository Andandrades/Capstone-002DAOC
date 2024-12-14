const express = require("express");
const { getNextDayClasses, getNextDayConsultations } = require("../controllers/rememberSchedule.controllers");

const router = express.Router();

router.get("/next-day", getNextDayClasses);
router.get("/next-schedule", getNextDayConsultations);

module.exports = router;
