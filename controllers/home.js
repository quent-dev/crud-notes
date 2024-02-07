const Note = require('../models/note');


module.exports = {
    getIndex: async (req, res) => {
        try {
            const notes = await Note.find();
            res.render('index.ejs', { notes: notes });
        } catch (error) {
            console.log(error);
        }
    },
}