const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

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

ToolsSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Tools', ToolsSchema)