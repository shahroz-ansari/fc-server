const express = require('express');
const authController = require('./controller.auth');


const router = express.Router();

//login authenticate route
router.get('/authenticate/google', authController.handleGoogleAuthenticationRequest);

module.exports = router