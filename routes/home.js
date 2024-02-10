const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');
const { ensureAuth } = require('../middleware/auth');

// @desc    Dashboard page
// @route   GET /dashboard
router.get('/', ensureAuth, homeController.getIndex);

module.exports = router