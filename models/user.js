const mongoose = require('mongoose');


const Schema = new mongoose.Schema({
    name: {
        type: String,
    },
    user_id: {
        type: String,
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