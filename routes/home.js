const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');

// Getting all notes from controller
router.get('/', homeController.getIndex);

module.exports = router