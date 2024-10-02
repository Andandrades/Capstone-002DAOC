const { Router } = require("express");

const { registerUser } = require("../controllers/sesion.controllers");


const router = Router();

router.post("/register", registerUser);
module.exports = router;
