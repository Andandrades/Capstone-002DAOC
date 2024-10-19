const { Router } = require("express");

const {
  registerUser,
  loginUser,
  checkAuth,
  logOut,
} = require("../controllers/sesion.controllers");

const router = Router();


const cors = require("cors");



// Configuración de CORS
const corsOptions = {
    origin: process.env.FRONTEND_URL, // URL de tu cliente
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos permitidos
    credentials: true, // Permitir cookies
};
  
  

router.post("/login", loginUser)
router.options("/login", cors(corsOptions));
router.post("/register", registerUser);
router.get("/checkauth", checkAuth);
router.post("/logout", logOut);



module.exports = router;
