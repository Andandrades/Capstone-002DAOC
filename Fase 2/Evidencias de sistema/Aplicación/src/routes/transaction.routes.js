const { Router } = require("express");


//import de los controladores
const {
    createTransaction
} = require("../controllers/transaction.controllers");

const express = require("express");
const cors = require("cors");
const app = express();

// Usar CORS
app.use(cors());

const router = Router();


router.post("/transaction", createTransaction);

module.exports = router;
