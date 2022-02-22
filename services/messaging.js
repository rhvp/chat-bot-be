const moment = require("moment");
const CONSTANTS = require("../config/constants");
const Message = require("../models/message");
const User = require("../models/user");
const request = require("./request");


let state = [
    "What is your birthdate?",
    "Would you like to know how many days there are till your next birthday?"
]



module.exports = {
    handleMessage: async(senderId, payload) => {
        let message = payload.text;
        await handleChat(senderId, message);
    },

    handlePostback: async (senderId, payload) => {
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
    await clearUser(senderId);

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

    await saveMessage(user, message);

    if(userState === 0) return await processName(senderId, user, message);

    else if(userState === 1) return await processBirthdate(senderId, user, message);

    if(message === "Yes!!") {
        const days = getDaysTillNextBirthdate(user.birthdate);
        response.text = `There are ${days} days left untill your next birthday.`;
    }

    else response.text = `Goodbye 👋`;
    
    return sendMessage(senderId, response);
}


const validateDate = (date) => {
    console.log(moment(date).isValid());

    if(!date || !moment(date).isValid()) return false;

    const validDate = moment(date).format('YYYY-MM-DD');

    return validDate;
}


const getDaysTillNextBirthdate = (birthdate) => {
    let year = moment().year();

    let monthDate = birthdate.substring(5);

    let nextBirthdate = moment(`${year}-${monthDate}`);

    if(nextBirthdate.isBefore(moment())) {
        year++;
        nextBirthdate = moment(`${year}-${monthDate}`);
    }

    return nextBirthdate.diff(moment(), 'd');
}


const clearUser = async (senderId) => {
    const user = await User.findOne({ senderId });

    if(!user) return;

    await User.deleteOne({ id: user.id });

    await Message.deleteMany({user: user.id});
}


const saveMessage = async (user, message) => {
    const messageObj = await Message.create({text: message, user: user.id});

    await User.updateOne({id: user.id}, {
        $push: {messages: messageObj._id}
    })
}


const processName = async (senderId, user, message, response) => {
    let name = message;

    await User.updateOne({id: user.id}, {name, state: 1});

    return await sendMessage(senderId, response);
}


const processBirthdate = async (senderId, user, message, response) => {
    let birthdate = message;

    const validDate = validateDate(birthdate);

    if(!validDate) {

        response.text = "invalid date";

        return await sendMessage(senderId, response);
    }
    else {
        await User.updateOne({id: user.id}, {birthdate, state: 2});

        const userState = user.state;

        payload = {
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

        return await sendPostBack(senderId, payload);
    }
}