const express = require('express');
const authRoutes = require('./auth');
const dbRoutes = require('./db');
const commonRoutes = require('./common');


const router = express.Router();

//auth routes
router.use('/auth', authRoutes);

//db routes
router.use('/db', dbRoutes);

//common routes
router.use('/common', commonRoutes)

module.exports = router