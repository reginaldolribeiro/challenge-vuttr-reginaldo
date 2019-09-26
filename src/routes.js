const express = require('express')
const routes = express.Router()
const ToolsController = require('../src/controllers/ToolsController')

/**
 * @swagger
 * /tools:
 *  get:
 *    description: Recuperar todas as ferramentas
 *    responses:
 *      '200':
 *        description: A successful response
 */
routes.get('/tools', ToolsController.findAll)
routes.get('/tools/:id', ToolsController.findById)

/**
 * @swagger
 * /tools:
 *   post:
 *     tags:
 *       - tools
 *     name: Tool
 *     summary: Register a new user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: "#definitions/Tools"
 *           type: object
 *         required:
 *           - title
 *           - link
 *     responses:
 *       '200':
 *         description: Tool created
 */
routes.post('/tools', ToolsController.store)
routes.put('/tools/:id', ToolsController.update)
routes.delete('/tools/:id', ToolsController.delete)

module.exports = routes