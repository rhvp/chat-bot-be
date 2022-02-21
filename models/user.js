const mongoose = require('mongoose');


const Schema = new mongoose.Schema({
    name: {
        type: String,
    },
    senderId: {
        type: String,
    },
    state: {
        type: Number,
        default: 0
    },
    birthdate: {
        type: String
    },
    messages: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'message',
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('user', Schema);