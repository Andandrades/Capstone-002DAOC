const { Router } = require("express");
const authenticateToken = require('../middlewares/authenticateToken')
const autorizeRole = require('../middlewares/authorizeRole')
const {getKpis , getUserList , getTransactionsData , getTransactionsList , getVentasPorMes , getGenders , getAvg} = require("../controllers/dashboard.controllers");

const router = Router();

router.get("/dashboard/usersData", authenticateToken, autorizeRole([4]), getKpis);
router.get("/dashboard/usersList",authenticateToken, autorizeRole([4]),  getUserList);
router.get("/dashboard/genderList",authenticateToken, autorizeRole([4]),  getGenders);
router.get("/dashboard/avgData",authenticateToken, autorizeRole([4]),  getAvg);
router.get("/dashboard/transactionsData",authenticateToken, autorizeRole([4]),  getTransactionsData);
router.get("/dashboard/transactionsList/:page/:limit",authenticateToken, autorizeRole([4]),  getTransactionsList);
router.get("/dashboard/transactionsPerMonth",authenticateToken, autorizeRole([4]),  getVentasPorMes);

module.exports = router;
