const mongoose = require('mongoose')

/**
 * @swagger
 * definitions:
 *   Tools:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *       link:
 *         type: integer
 *       description:
 *         type: string
 *       tags:
 *         type: array
 *         items:
 *           type: string          
 *       required:
 *         - title
 *         - link
 */
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