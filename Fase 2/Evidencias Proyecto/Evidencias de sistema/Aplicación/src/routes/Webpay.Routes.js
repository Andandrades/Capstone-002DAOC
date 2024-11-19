const express = require("express");
const { iniciarTransaccion, confirmarPago,obtenerEstadoTransaccion,iniciarConsulta,confirmarPagoconsulta } = require("../controllers/Webpay.controllers");
const router = express.Router();

router.post("/iniciar-transaccion", iniciarTransaccion);
router.post("/iniciar-consulta", iniciarConsulta);
router.get("/confirmar-pago", confirmarPago);
router.get("/confirmar-pago-consulta", confirmarPagoconsulta);

router.get("/transaction-status", obtenerEstadoTransaccion);

module.exports = router;
