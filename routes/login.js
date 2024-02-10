const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');
const { ensureGuest } = require('../middleware/auth');

// Getting all notes from controller
router.get('/', ensureGuest,loginController.getLogin);

module.exports = router