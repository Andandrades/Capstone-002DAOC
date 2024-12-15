const { Router } = require("express");
const pool = require("../db");
const authenticateToken = require('../middlewares/authenticateToken')
const autorizeRole = require('../middlewares/authorizeRole')
//import de los controladores

const {getAllExercise, getExercise, createExercise, updateExercise, deleteExercise , getExerciseFromHistory , getTop} = require("../controllers/exercise.controllers");

const router = Router();

router.get("/exercise", authenticateToken, autorizeRole([1,2,3,4]),getAllExercise);

router.get("/exercisebyid/:id",authenticateToken, autorizeRole([1,2,3,4]), getExercise );

router.get("/ExercisesTop",authenticateToken, autorizeRole([1,2,3,4]), getTop);

router.get("/exercisebyHistory/:id",authenticateToken, autorizeRole([1,2,3,4]), getExerciseFromHistory);

router.post("/exercise",authenticateToken, autorizeRole([2,3,4]),createExercise);

router.put("/exercise",authenticateToken, autorizeRole([2,3,4]), updateExercise);

router.delete("/exercise",authenticateToken, autorizeRole([2,3,4]), deleteExercise);

module.exports = router;
