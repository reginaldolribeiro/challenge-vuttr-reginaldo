require('dotenv/config');
const express = require('express')
const mongoose = require('mongoose')
// const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../src/swagger.json')

// iniciando o app
const app = express()

// iniciando o DB
mongoose.connect("mongodb+srv://" + process.env.APP_DB_CONNECTION,
    { useFindAndModify: false })
    .then(conn => console.log("Conectado ao MongoDB!!!"))
    .catch(err => console.log("Erro ao se conectar no MongoDB!"))

// mongoose.connection.on('connected', () => {
//     console.log("MongoDB Connected!")
// })

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.json())

app.use(require('./routes'));

app.listen(3000, () => {
    console.log("Server is running!")
})