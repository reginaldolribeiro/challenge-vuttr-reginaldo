const mongoose = require('mongoose')

const ToolsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    description: String,
    tags: Array
},
{
    timestamps: true
})

module.exports = mongoose.model('Tools', ToolsSchema)