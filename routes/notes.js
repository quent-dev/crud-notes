const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes');

router.post('/', notesController.addNote);
router.put('/', notesController.replaceNote);
router.delete('/', notesController.deleteNote);

module.exports = router