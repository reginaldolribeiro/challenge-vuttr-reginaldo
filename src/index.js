require('dotenv').config({})
const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../src/swagger.json')

const app = express()

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(express.json())
app.use(cors())

app.use('/vuttr-api', require('./routes'));

module.exports = app