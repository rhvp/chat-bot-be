const moment = require("moment");
const CONSTANTS = require("../config/constants");
const User = require("../models/user");
const request = require("./request");


let state = [
    "What is your birthdate?",
    "Would you like to know how many days there are till your next birthday?"
]



module.exports = {
    handleMessage: (senderId, payload) => {
        console.log("message: ",payload);
        let message = payload.text;
        await handleChat(senderId, message);
    },

    handlePostback: async (senderId, payload) => {
        console.log(payload);
        let message = payload.payload;
        if(message === CONSTANTS.APP_START) await respondStart(senderId);
        else handleChat(senderId, message);
    }
}




const sendMessage = async (senderId, payload) => {
    let body = {
        recipient: {
            id: senderId,
        },
        message: payload
    }

    await request.postMessage(body);
}


const sendPostBack = async (senderId, payload) => {
    let body = {
        recipient:{
            id: senderId
          },
          messaging_type: "RESPONSE",
          message: payload
    }
    await request.postMessage(body);
}


const handleChat = async (senderId, message) => {
    const user = await User.findOne({ senderId });

    if(!user) return respondStart(senderId);

    else await respondReturning(user, message);
}


const respondStart = async(senderId) => {
    let response = {
        text: "What is your firstname?"
    }
    await User.create({ senderId });
    await sendMessage(senderId, response);
}


const respondReturning = async(user, message) => {
    let text;
    const userState = user.state;
    const senderId = user.senderId;
    text = state[userState];
    let response = {
        text
    }

    if(userState === 0) {
        let name = message.text;
        if(name && name.length > 0) await User.updateOne({id: user.id}, {name, state: 1});
        return await sendMessage(senderId, response);
    }   

    else if(userState === 1) {
        let birthdate = message.text;
        if(birthdate && moment(birthdate).isValid()) await User.updateOne({id: user.id}, {birthdate, state: 2});
        let message = {
        text: state[userState],
        quick_replies:[
                {
                content_type:"text",
                title:"Yes!!",
                payload:"yes",
                },
                {
                content_type:"text",
                title:"No!!",
                payload:"no",
                }
            ]
        }
        return await sendPostBack(senderId, message);
    }

    let message;

    if(message === "yes") {
        let diff = moment(user.birthdate).diff(moment(), 'days');
        message = `There are ${diff} left to your next birthday.`;
    }

    else message = `Goodbye 👋`;

    response.text = message;
    
    return sendMessage(senderId, response);
}