const express = require('express');
const webhookController = require('../controllers/webhookController');

const router = express.Router();

router.get('/webhooks', webhookController.verifyWebhook)


module.exports = router;