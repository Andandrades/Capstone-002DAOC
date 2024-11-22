const { Router } = require("express");

const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getUsersByRole,
  createUser,
  uploadPicture,
  getProfilePicture,
  getUserData
} = require("../controllers/user.controllers");

const router = Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/users", getAllUsers);
router.get("/users/:id", getUser);

router.get("/userData/:id", getUserData);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.post("/register", createUser);

router.get("/users/role/Clientes", (req, res) =>
  getUsersByRole({ ...req, params: { roleId: 1 } }, res)
);
router.get("/users/role/Entrenadores", (req, res) =>
  getUsersByRole({ ...req, params: { roleId: 2 } }, res)
);
router.get("/users/role/Nutricionistas", (req, res) =>
  getUsersByRole({ ...req, params: { roleId: 3 } }, res)
);
router.get("/users/role/Administradores", (req, res) =>
  getUsersByRole({ ...req, params: { roleId: 4 } }, res)
);

router.put('/uploadProfilePicture/:id', upload.single('profile_picture'), uploadPicture);

router.get('/getProfilePicture/:id', getProfilePicture);


module.exports = router;
