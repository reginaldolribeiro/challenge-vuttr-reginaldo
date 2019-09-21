const mongoose = require('mongoose')

const ToolsSchema = new mongoose.Schema({
    title: String,
    link: String,
    description: String,
    tags: String
},
{
    timestamps: true
})

module.exports = mongoose.model('Tools', ToolsSchema)