const express = require('express');
const dbController = require('./controller.db');


const router = express.Router();

//add Member to Group 
router.post('/invitation/add', dbController.addInvitation);

//create group chat db
router.post('/groupChat/create',dbController.createChatDb);

module.exports = router