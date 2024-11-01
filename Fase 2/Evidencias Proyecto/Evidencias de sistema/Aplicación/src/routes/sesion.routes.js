const { Router } = require("express");

const { registerUser, loginUser,checkAuth,logOut} = require("../controllers/sesion.controllers");

const router = Router();

const cors = require("cors");

router.post("/login", loginUser)
router.post("/register", registerUser);
router.get("/checkauth", checkAuth);
router.post("/logout", logOut);

module.exports = router;
