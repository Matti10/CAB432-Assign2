/* CAB432 Assignment 2

    Author: Simon Di Florio
    Date: 23/10/2022

    References:

    This file contains the server app code 
*/

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

require('dotenv').config();

const s3 = require('./api/s3-api');
const redis = require('./api/redis-api');
const sharp = require('./api/sharp-api');

const indexRouter = require('./routes/index');
const uploadRouter = require('./routes/upload');
const downloadRouter = require('./routes/download');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// setup server properties
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// setup routes
app.use('/', indexRouter);
app.use('/upload', uploadRouter);
app.use('/download', uploadRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
