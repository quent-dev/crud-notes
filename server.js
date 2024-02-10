console.log("Starting server");
const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const connectDB = require("./config/database");
const loginRoutes = require("./routes/login");
const homeRoutes = require("./routes/home");
const notesRoutes = require("./routes/notes");

// Load config
require("dotenv").config({ path: "./config/.env" });
const port = process.env.PORT || 3000;

// Passport config
require("./config/passport")(passport);

// Connect to database
connectDB();

// Set up view engine
app.set('views', __dirname + '/views');
app.set("view engine", "ejs");

// Static folder
app.use(express.static(__dirname + '/public/'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// Express session
app.use(session({
    secret: 'secret-key',
    resave: false, // Don't save session if unmodified
    saveUninitialized: false // Don't create session until something stored
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', loginRoutes)   
app.use('/dashboard', homeRoutes)
app.use('/notes', notesRoutes)
app.use('/auth', require('./routes/auth'))

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})