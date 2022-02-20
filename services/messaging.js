const request = require("./request")

module.exports = {
    handleMessage: (senderId, payload) => {
        console.log("sender_id: ",senderId);
        console.log("message: ",payload);
    },

    handlePostback: (senderId, payload) => {
        console.log("sender_id: ",senderId);
        console.log("message: ",payload);
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