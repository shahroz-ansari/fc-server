var express = require('express');
var authRoutes = require('./auth');


var router = express.Router();

//auth routes
router.use('/auth', authRoutes);

module.exports = router