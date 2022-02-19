const request = require("./request")

module.exports = {
    handleMessage: (senderId, payload) => {
        if(payload.text) {
            
        }
    },

    handlePostback: (senderId, payload) => {

    },

    sendMessage: async (senderId, payload) => {
        let body = {
            recipient: {
                id: senderId,
            },
            message: payload
        }

        await request.postMessage(body);
    }
}