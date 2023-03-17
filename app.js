const express = require('express');
const cors = require('cors');
const { logError, errorHandler, boomError } = require('./src/middleWares/errorHandler');

const app = express();

app.use(express.json());
app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: false }));

app.use(logError);
app.use(boomError);
app.use(errorHandler);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

module.exports = app;