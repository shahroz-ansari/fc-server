var express = require('express');

var v1Routes = require('./v1');

var appRouter = express.Router();

// v1 routes
appRouter.use('/v1', v1Routes);

module.exports = appRouter;