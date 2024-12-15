const express = require("express");
const {getSubscriptionsByUserId} = require("../controllers/subscriptionController");
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken')

router.post("/subscriptionByUser/",authenticateToken, getSubscriptionsByUserId)

module.exports = router;
