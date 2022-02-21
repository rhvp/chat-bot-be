const express = require('express');
const { initializeApp } = require('../controllers/appController');
const webhookController = require('../controllers/webhookController');

const router = express.Router();

router.get('/start', initializeApp);

router.route('/webhooks')
    .get(webhookController.verifyWebhook)
    .post(webhookController.processWebhook)


module.exports = router;