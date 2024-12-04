const { Router } = require("express");

const {getKpis , getUserList , getTransactionsData , getTransactionsList , getVentasPorMes} = require("../controllers/dashboard.controllers");

const router = Router();

router.get("/dashboard/usersData", getKpis);
router.get("/dashboard/usersList", getUserList);
router.get("/dashboard/transactionsData", getTransactionsData);
router.get("/dashboard/transactionsList/:page/:limit", getTransactionsList);
router.get("/dashboard/transactionsPerMonth", getVentasPorMes);

module.exports = router;
