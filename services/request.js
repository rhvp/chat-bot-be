const axios = require('axios').default;

let message_url = `https://graph.facebook.com/v2.6/me/messages?access_token=${process.env.PAGE_TOKEN}`;

module.exports = {
    postMessage: async (payload) => {
        try {
            const response = await axios.request({
                url: message_url,
                method: 'POST',
                data: JSON.stringify(payload)
            })
            console.log('message sent', response.data);
        } catch (error) {
            console.error(error);
        }
    }
}