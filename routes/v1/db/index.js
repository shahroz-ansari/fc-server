const express = require('express');
const dbController = require('./controller.db');


const router = express.Router();

//add Member to Group 
router.post('/invitation/add', dbController.addInvitation);

//create group chat db
router.post('/group/new', dbController.handleNewGroup);

module.exports = router