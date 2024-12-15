const { Router } = require("express");
const authenticateToken = require('../middlewares/authenticateToken')
const autorizeRole = require('../middlewares/authorizeRole')

//import de los controladores
const {
  getAllRoles,
  getRol,
  createRol,
  updateRol,
  deleteRol,
} = require("../controllers/roles.controllers");


const router = Router();

router.get("/roles",authenticateToken, autorizeRole([4]), getAllRoles);

router.get("/roles/:id",authenticateToken, autorizeRole([4]), getRol);

router.post("/roles", authenticateToken, autorizeRole([4]),createRol);

router.put("/roles/:id",authenticateToken, autorizeRole([4]), updateRol);

router.delete("/roles/:id", authenticateToken, autorizeRole([4]),deleteRol);

module.exports = router;
