const mongoose = require('mongoose');


const Schema = new mongoose.Schema({
    text: {
        type: String,
    },
    messageId: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('message', Schema);