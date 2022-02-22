const express = require('express');
const { initializeApp, getMessages, fetchMessage, summary } = require('../controllers/appController');
const webhookController = require('../controllers/webhookController');

const router = express.Router();

router.get('/start', initializeApp);

router.get("/messages", getMessages);

router.get("/messages/:id", fetchMessage);

router.get("/summary", summary);

router.route('/webhooks')
    .get(webhookController.verifyWebhook)
    .post(webhookController.processWebhook)


module.exports = router;