const express = require("express");
const { iniciarTransaccion, confirmarPago } = require("../controllers/Webpay.controllers");
const router = express.Router();

router.post("/iniciar-transaccion", iniciarTransaccion);
router.get("/confirmar-pago", confirmarPago);

module.exports = router;
