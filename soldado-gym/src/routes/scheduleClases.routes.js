const { Router } = require("express");
const pool = require("../db");

//import de los controladores

const {  getAll, getbyid, create, update, deletebyid , getHourByGymId} = require("../controllers/scheduleClases.controllers");

const router = Router();

router.get("/schedule", getAll);

router.get("/schedule/:id", getbyid);

router.get("/scheduleinfo/:id", getHourByGymId);

router.post("/schedule", create);

router.put("/schedule", update);

router.delete("/schedule", deletebyid);


module.exports = router;
