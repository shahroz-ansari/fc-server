const express = require('express');
const commonController = require('./controller.common');


const router = express.Router();

//search user using email
router.get('/search/user/:email', commonController.searchUserByEmail);

module.exports = router