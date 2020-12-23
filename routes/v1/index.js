var express = require('express');
var auth = require('./auth');


var v1Router = express.Router();

//auth routes
v1Router.use('/auth', auth.authRoutes);

module.exports = { v1Router }