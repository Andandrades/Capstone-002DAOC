const express = require("express");

const authenticateToken = require('../middlewares/authenticateToken')
const autorizeRole = require('../middlewares/authorizeRole')

const { iniciarTransaccion, confirmarPago,obtenerEstadoTransaccion,iniciarConsulta,confirmarPagoconsulta ,getMonthPurchases } = require("../controllers/Webpay.controllers");
const router = express.Router();

router.post("/iniciar-transaccion", iniciarTransaccion);
router.post("/iniciar-consulta", iniciarConsulta);
router.get("/confirmar-pago", confirmarPago);
router.get("/confirmar-pago-consulta", confirmarPagoconsulta);

router.get("/transaction-status", obtenerEstadoTransaccion);

router.post("/getMouthPurchases", authenticateToken, autorizeRole([2,3,4]), getMonthPurchases);

module.exports = router;
