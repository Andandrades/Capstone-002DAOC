const { Router } = require('express');
const { sendEmail } = require('../controllers/Mailer.Controllers');

const router = Router();

router.post('/sendemail', sendEmail);

module.exports = router;

