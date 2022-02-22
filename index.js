require('dotenv').config();
require('./config/db');
const app = require('./app');
const moment = require('moment');

let PORT = process.env.PORT || 2650;

app.listen(PORT, ()=> {
    console.log('running chatbot');
})
