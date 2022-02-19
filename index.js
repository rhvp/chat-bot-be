require('dotenv').config();
require('./config/db');
const app = require('./app');

let PORT = process.env.PORT || 2650;

app.listen(PORT, ()=> {
    console.log('running chatbot');
})