const express = require("express");
const { iniciarTransaccion, confirmarPago,obtenerEstadoTransaccion } = require("../controllers/Webpay.controllers");
const router = express.Router();

router.post("/iniciar-transaccion", iniciarTransaccion);
router.get("/confirmar-pago", confirmarPago);
router.get("/transaction-status", obtenerEstadoTransaccion);

module.exports = router;
