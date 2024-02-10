const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');

// @desc    Dashboard page
// @route   GET /dashboard
router.get('/', homeController.getIndex);

module.exports = router