const { Router } = require("express");
const authenticateToken = require('../middlewares/authenticateToken')
const autorizeRole = require('../middlewares/authorizeRole')
const {  getAll, getbyid, create, update, deletebyid} = require("../controllers/Nutri.controllers");
const router = Router();

router.get("/Nutri" ,getAll);

router.get("/Nutri/:id",getbyid);

router.post("/Nutri",authenticateToken, autorizeRole([3,4]), create);

router.put("/Nutri/:id",authenticateToken, autorizeRole([3,4]), update);

router.delete("/DeleteNutri/:id", authenticateToken, autorizeRole([3,4]),deletebyid);

module.exports = router;
