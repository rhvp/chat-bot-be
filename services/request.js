const CONSTANTS = require('../config/constants');

const axios = require('axios').default;

let message_url = `https://graph.facebook.com/v2.6/me/messages?access_token=${process.env.PAGE_TOKEN}`;

let profile_url = `https://graph.facebook.com/v2.6/me/messenger_profile?access_token=${process.env.PAGE_TOKEN}`;

const sendRequest = async(url, type, payload = {}) => {
    try {
        let options = {
            url,
            method: type,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        if(payload) options['data'] = JSON.stringify(payload);
        const response = await axios.request(options)
        console.log('request sent', response.data);
        return response.data;
    } catch (error) {
        console.error(error.response.data);
    }
}

module.exports = {
    postMessage: async (payload) => {
        const response = await sendRequest(message_url, CONSTANTS.POST, payload);

        return response;
    },

    postProfile: async(payload) => {
        const response = await sendRequest(profile_url, CONSTANTS.POST, payload);

        return response;
    }
}