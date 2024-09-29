const { Router } = require("express");
const pool = require("../db");

//import de los controladores

const {getAllExercise, getExercise, createExercise, updateExercise, deleteExercise} = require("../controllers/exercise.controllers");

const router = Router();

router.get("/exercise", getAllExercise);

router.get("/exercisebyid/id", getExercise);

router.post("/exercise", createExercise);

router.put("/exercise", updateExercise);

router.delete("/exercise", deleteExercise);

module.exports = router;
