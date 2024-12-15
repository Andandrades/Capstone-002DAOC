const { Router } = require("express");
const pool = require("../db");
const authenticateToken = require('../middlewares/authenticateToken')
const autorizeRole = require('../middlewares/authorizeRole')
//import de los controladores

const {  getAll, getbyid, create, update, deletebyid , getbyClassId , getUserHistory , updateExerciseTarget} = require("../controllers/exerciseHistory.controllers");

const router = Router();

router.get("/ExercisesRecords",authenticateToken, autorizeRole([1,2,3,4]), getAll);

router.get("/ExercisesRecords/:id",authenticateToken, autorizeRole([1,2,3,4]), getbyid);

router.get("/userRecords/:id",authenticateToken, autorizeRole([1,2,3,4]), getUserHistory);

router.get("/ExercisesClass/:id",authenticateToken, autorizeRole([1,2,3,4]), getbyClassId);

router.post("/createExerciseRecords",authenticateToken, autorizeRole([1,2,3,4]), create);

router.put("/updateExercisesRecords",authenticateToken, autorizeRole([1,2,3,4]), update);

router.put("/exerciseHistory/:history_id/target",authenticateToken, autorizeRole([1,2,3,4]), updateExerciseTarget);

router.delete("/deleteExercisesRecords",authenticateToken, autorizeRole([1,2,3,4]), deletebyid);

module.exports = router;
