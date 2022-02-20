const AppError = require('../config/appError');
const { handleMessage, handlePostback } = require('../services/messaging');
const webhook = require('../services/webhook');
module.exports = {
    verifyWebhook: (req, res, next) => {
        try {
            webhook.verify(req);

            return res.send(req.query.hub.challenge);
        } catch (error) {
            return next(error);
        }
    },


    processWebhook: (req, res, next) => {
        try {
            let data = req.body;

            if (data.object !== 'page') throw new AppError("unsupported function", 404);

            for(let i=0; i<data.entry.length; i++) {
                let entry = data.entry[i];

                let event = entry.messaging[0];

                let senderId = event.sender.id;

                if(event.message) handleMessage(senderId, event.message);

                else if(event.postback) handlePostback(senderId, event.postback);
            }

            return res.status(200).json({
                status: "success"
            });
        } catch (error) {
            return next(error);
        }
    }
}