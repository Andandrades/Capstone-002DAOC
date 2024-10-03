const { Router } = require("express");

const { registerUser ,loginUser, checkAuth ,logOut} = require("../controllers/sesion.controllers");


const router = Router();

router.post("/login",loginUser )
router.post("/register", registerUser);
router.get('/check-auth', checkAuth)
router.post('/logout' , logOut)
module.exports = router;
