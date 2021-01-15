const express = require('express');
const authRoutes = require('./auth');
const dbRoutes = require('./db');


const router = express.Router();

//auth routes
router.use('/auth', authRoutes);

//db routes
router.use('/db', dbRoutes);

module.exports = router