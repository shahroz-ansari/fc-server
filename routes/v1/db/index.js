const express = require('express');
const dbController = require('./controller.db');


const router = express.Router();

//add Member to Group 
router.post('/invitation/add', dbController.addInvitation);

module.exports = router