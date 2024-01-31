console.log("Starting server");
const bodyParser = require("body-parser");
const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

// Get MongoDB connection string loaded from .env
const MongoClient = require("mongodb").MongoClient;
const dbUrl = process.env.DATABASE_URL;
const dbAdmin = process.env.DB_ADMIN;
const dbPassword = process.env.DB_PASSWORD;

const mongoUrl = `mongodb+srv://${encodeURIComponent(dbAdmin)}:${encodeURIComponent(dbPassword)}@${dbUrl}/?retryWrites=true&w=majority`;


MongoClient.connect(mongoUrl,{useUnifiedTopology: true,})
    .then((client) => {
        console.log("Connected to Database");
        const db = client.db("crud-notes");
        const notesCollection = db.collection("notes");

        app.set("view engine", "ejs");
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(express.static(__dirname + 'public'))
        app.use(bodyParser.json())

        app.get("/", (req, res) => {
            notesCollection
                .find()
                .toArray()
                .then((results) => {
                    res.render(__dirname + "/views/index.ejs", { notes: results })
                    console.log("Refreshed the page")
                })
                .catch((error) => {
                    console.log(error);
                })
        })

        app.post("/notes", (req, res) => {
            notesCollection
                .insertOne(req.body)
                .then((result) => {
                    res.redirect("/")
                })
                .catch((error) => {
                    console.log(error);
                })
        })

        app.put("/notes", (req, res) => {
            notesCollection
                .findOneAndUpdate(
                    { topic: "test" }, 
                    {
                    $set: {
                        topic: req.body.topic,
                        note: req.body.note,
                      },

                    },
                    {
                        upsert: true,
                    }
                )
                .then((result) => {
                    res.json("Success")
                    res.redirect("/")
                })
                .catch((error) => {
                    console.log(error);
                })
        })

        app.delete("/notes", (req, res) => {
            notesCollection
                .deleteOne({ topic: req.body.topic })
                .then((result) => {
                    if (result.deletedCount === 0) {
                        return res.json('No note to delete')
                    }
                    res.json("Deleted important note")
                })
                .catch((error) => {
                    console.log(error);
                })
        })

        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        })
        
    })
    .catch((error) => {
        console.log(error);
    })


