var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var pouchHandle = require('./config/express-pouch')
require('./config/mongoose')();

var router = require('./routes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/fc', router.appRouter)

if (process.env.ENVIRONMENT === 'development') {
    app.use('/', pouchHandle);
}

module.exports = app;
