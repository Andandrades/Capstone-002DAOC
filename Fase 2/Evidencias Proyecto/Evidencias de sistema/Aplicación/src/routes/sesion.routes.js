const { Router } = require("express");

const { registerUser, loginUser,checkAuth,logOut,changePassword, resetPassword } = require("../controllers/sesion.controllers");

const router = Router();

router.post("/login", loginUser)
router.post("/register", registerUser);
router.get("/checkauth", checkAuth);
router.post("/logout", logOut);
router.post("/change-password", changePassword);
router.post('/reset-password', resetPassword);

module.exports = router;
