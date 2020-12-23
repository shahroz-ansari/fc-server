var express = require('express');
var router = require('./v1');

var appRouter = express.Router();

// v1 routes
appRouter.use('/v1', router.v1Router);

module.exports = appRouter;