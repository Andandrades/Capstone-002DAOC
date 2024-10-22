const { Router } = require("express");
const pool = require("../db");

//import de los controladores

const {  getAll, getbyid, create, update, deletebyid} = require("../controllers/Nutri.controllers");

const router = Router();

router.get("/Nutri", getAll);

router.get("/Nutri/:id", getbyid);

router.post("/Nutri", create);

router.put("/Nutri/:id", update);

router.delete("/DeleteNutri/:id", deletebyid);

module.exports = router;
