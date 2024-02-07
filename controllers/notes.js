const Note = require('../models/note');

module.exports = {
    addNote : async (req, res) => {
        try {
            await Note.create({topic: req.body.topic, note: req.body.note})
            res.redirect("/")
        } catch (error) {
            console.log(error);
        }
    },

    // Replace the test note with an important note (hard coded in the front end for now)
    replaceNote : async (req, res) => {
        await Note.findOneAndUpdate(
            { topic: "test" },
            { topic: req.body.topic, note: req.body.note },
            { upsert: false },
        )
        res.redirect("/")
    },

    // Delete the 'important' note
    deleteNote : async (req, res) => {
        await Note.deleteOne({ topic: req.body.topic })
        res.redirect("/")
    }
}