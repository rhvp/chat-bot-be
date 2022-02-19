const expresss = require('express');
const cors = require('cors');
const app = expresss();
const errorHandler = require('./config/errorHandler');
const AppError = require('./config/appError');
const appRouter = require('./routes/routes');


app.use(cors());
app.options('*', cors());

app.use(expresss.json());

app.get('/', (req, res) => res.send('hello 😇'));

app.use('/api', appRouter);

app.use((req, res, next)=>{
    let err = new AppError(`${req.ip} tried to reach a resource at ${req.originalUrl} that is not on this server.`, 404);
    next(err);
});

app.use(errorHandler);

module.exports = app;