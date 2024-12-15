const { Router } = require("express");

const authenticateToken = require('../middlewares/authenticateToken')
const autorizeRole = require('../middlewares/authorizeRole')

const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getUsersByRole,
  createUser,
  uploadPicture,
  getProfilePicture,
  getUserData,
} = require("../controllers/user.controllers");

const router = Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/users",authenticateToken, autorizeRole([2,3,4]),getAllUsers);
router.get("/users/:id", authenticateToken, autorizeRole([2,3,4]), getUser);

router.get("/userData/:id", authenticateToken, autorizeRole([2,3,4]), getUserData);
router.put("/users/:id", authenticateToken, autorizeRole([2,3,4]), updateUser);
router.delete("/users/:id", authenticateToken, autorizeRole([2,3,4]), deleteUser);
//router.post("/register", createUser);

router.get("/users/role/Clientes", (req, res) =>
  getUsersByRole({ ...req, params: { roleId: 1 } }, res),
  authenticateToken, autorizeRole([2,3,4]),
);
router.get("/users/role/Entrenadores", (req, res) =>
  getUsersByRole({ ...req, params: { roleId: 2 } }, res),
  authenticateToken, autorizeRole([2,3,4]),
);
router.get("/users/role/Nutricionistas", (req, res) =>
  getUsersByRole({ ...req, params: { roleId: 3 } }, res),
  authenticateToken, autorizeRole([2,3,4]),
);
router.get("/users/role/Administradores", (req, res) =>
  getUsersByRole({ ...req, params: { roleId: 4 } }, res),
  authenticateToken, autorizeRole([2,3,4]),
);

router.put('/uploadProfilePicture/:id', upload.single('profile_picture'), uploadPicture);

router.get('/getProfilePicture/:id', getProfilePicture);



module.exports = router;
