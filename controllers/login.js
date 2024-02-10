module.exports = {
    getLogin: async (req, res) => {
        try {
            res.render('login.ejs');
        } catch (error) {
            console.log(error);
        }
    },
}