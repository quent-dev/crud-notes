console.log("Starting server");
const express = require("express");
const app = express();
require("dotenv").config({ path: "./config/.env" });
const port = process.env.PORT || 3000;
const connectDB = require("./config/database");
const homeRoutes = require("./routes/home");
const notesRoutes = require("./routes/notes");

// Connect to database
connectDB();

app.set('views', __dirname + '/views');
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public/'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// Routes
app.use('/', homeRoutes)
app.use('/notes', notesRoutes)

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})