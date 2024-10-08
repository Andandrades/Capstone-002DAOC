const { Router } = require("express");


//import de los controladores
const {
    createTransaction
} = require("../controllers/transaction.controllers");

const router = Router();

router.post("/transaction", createTransaction);

module.exports = router;
