const express = require('express')
const mongoose = require('mongoose')

// iniciando o app
const app = express()
app.use(express.json())

// iniciando o DB
mongoose.connect('mongodb+srv://challenge-vurrt:vuttrB398@cluster0-k2fyh.mongodb.net/challenge-vuttr?retryWrites=true&w=majority')
    .then(conn => console.log("Conectado ao MongoDB!!!"))
    .catch(err => console.log("Erro ao se conectar ao MongoDB!"))

mongoose.connection.on('connected', () => {
    console.log("MongoDB Connected!")
})    

app.use(require('./routes'));

app.listen(3000, () => {
    console.log("Server is running!")
})