require('dotenv').config({})
const express = require('express')
const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../src/swagger.json')

const app = express()

mongoose.connect("mongodb+srv://" + process.env.APP_DB_CONNECTION,
    { useFindAndModify: false })
    .then(conn => console.log("Connected to MongoDB Database!"))
    .catch(err => console.log("Error connecting to MongoDB Database!"))

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(express.json())

app.use('/vuttr-api', require('./routes'));

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running!")
})