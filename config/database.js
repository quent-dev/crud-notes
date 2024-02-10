const mongoose = require('mongoose')
require('dotenv').config({path: __dirname + '/.env'})


const dbUrl = process.env.DATABASE_URL;
const dbAdmin = process.env.DB_ADMIN;
const dbPassword = process.env.DB_PASSWORD;
console.log(dbUrl, dbAdmin, dbPassword)

const mongoUrl = `mongodb+srv://${encodeURIComponent(dbAdmin)}:${encodeURIComponent(dbPassword)}@${dbUrl}/?retryWrites=true&w=majority`;

const connectDB = async () => {
    try {
        // Specify the dbName in options since we have multiple DBs in our cluster
        const conn = await mongoose.connect(mongoUrl, {dbName: 'crud-notes'})

        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB