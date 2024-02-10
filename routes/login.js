const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');

// Getting all notes from controller
router.get('/', loginController.getLogin);

module.exports = router