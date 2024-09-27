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

router.get("/roles/10", getRol);

router.post("/roles", createRol);

router.put("/roles", updateRol);

router.delete("/roles", deleteRol);

module.exports = router;
