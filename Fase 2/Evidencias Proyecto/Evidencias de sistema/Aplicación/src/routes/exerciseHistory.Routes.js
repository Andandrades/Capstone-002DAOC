const { Router } = require("express");
const pool = require("../db");

//import de los controladores

const {  getAll, getbyid, create, update, deletebyid , getbyClassId , getUserHistory} = require("../controllers/exerciseHistory.controllers");

const router = Router();

router.get("/ExercisesRecords", getAll);

router.get("/ExercisesRecords/:id", getbyid);

router.get("/userRecords/:id", getUserHistory);

router.get("/ExercisesClass/:id", getbyClassId);

router.post("/createExerciseRecords", create);

router.put("/updateExercisesRecords", update);

router.delete("/deleteExercisesRecords", deletebyid);

module.exports = router;
