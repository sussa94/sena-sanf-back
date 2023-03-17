/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const logError = (err, req, res, next) => {
    console.log('Error ', err);
    next();
}
const errorHandler = (err, req, res, next) => {
    res.status(500).json({
        message : err.message,
        stack : err.stack
    });
}
const boomError = (err, req, res, next) => {
    if(err.isboom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    }
    next(err); 
}

module.exports = { logError, errorHandler, boomError }