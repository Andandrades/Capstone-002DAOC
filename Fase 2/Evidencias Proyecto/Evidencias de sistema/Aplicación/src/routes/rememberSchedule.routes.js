const express = require("express");
const { getNextDayClasses } = require("../controllers/rememberSchedule.controllers");

const router = express.Router();

router.get("/next-day", getNextDayClasses);

module.exports = router;
