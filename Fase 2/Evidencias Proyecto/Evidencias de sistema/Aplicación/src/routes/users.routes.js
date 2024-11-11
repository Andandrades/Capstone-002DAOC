const { Router } = require("express");
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getUsersByRole
} = require("../controllers/user.controllers");

const router = Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

router.get("/users/role/Clientes", (req, res) => getUsersByRole({ ...req, params: { roleId: 1 } }, res));
router.get("/users/role/Entrenadores", (req, res) => getUsersByRole({ ...req, params: { roleId: 2 } }, res));
router.get("/users/role/Nutricionistas", (req, res) => getUsersByRole({ ...req, params: { roleId: 3 } }, res));
router.get("/users/role/Administradores", (req, res) => getUsersByRole({ ...req, params: { roleId: 4 } }, res));

module.exports = router;