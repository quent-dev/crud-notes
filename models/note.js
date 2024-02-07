const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    }
}, { collection: 'notes' });

module.exports = mongoose.model('Note', NoteSchema)