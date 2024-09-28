const { Router } = require("express");


//import de los controladores
const {
  getAllRoles,
  getRol,
  createRol,
  updateRol,
  deleteRol,
} = require("../controllers/roles.controllers");


const router = Router();

router.get("/roles", getAllRoles);

router.get("/roles/:id", getRol);

router.post("/roles", createRol);

router.put("/roles/:id", updateRol);

router.delete("/roles/:id", deleteRol);

module.exports = router;
