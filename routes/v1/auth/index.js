const express = require('express');
const authController = require('./controller.auth');
const authService = require('./service.auth');


const authRoutes = express.Router();

//login authenticate route
authRoutes.route('/authenticate/google').get(authController.handleGoogleAuthenticationRequest);

module.exports = { authRoutes, authService }