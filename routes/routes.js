const express = require('express');
const webhookController = require('../controllers/webhookController');

const router = express.Router();

router.route('/webhooks')
    .get(webhookController.verifyWebhook)
    .post(webhookController.processWebhook)


module.exports = router;