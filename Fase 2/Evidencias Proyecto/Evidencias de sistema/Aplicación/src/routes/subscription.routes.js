const express = require("express");
const {getSubscriptionsByUserId} = require("../controllers/subscriptionController");
const router = express.Router();

router.post("/subscriptionByUser/", getSubscriptionsByUserId)

module.exports = router;
