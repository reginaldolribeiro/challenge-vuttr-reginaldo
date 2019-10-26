require('dotenv').config({})
const mongoose = require('mongoose')

mongoose.connect(process.env.APP_DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(conn => console.log("Connected to MongoDB Database!"))
    .catch(err => console.log("Error connecting to MongoDB Database!"))