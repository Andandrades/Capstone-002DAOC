const { Router } = require("express");

const { registerUser, loginUser,checkAuth,logOut,changePassword} = require("../controllers/sesion.controllers");

const router = Router();

router.post("/login", loginUser)
router.post("/register", registerUser);
router.get("/checkauth", checkAuth);
router.post("/logout", logOut);
router.post("/change-password", changePassword);


module.exports = router;
