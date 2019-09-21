const express = require('express')
const routes = express.Router()
const ToolsController = require('../src/controllers/ToolsController')

routes.get('/tools', ToolsController.findAll)
routes.get('/tools/:id', ToolsController.findById)
routes.post('/tools', ToolsController.store)
routes.put('/tools/:id', ToolsController.update)
routes.delete('/tools/:id', ToolsController.delete)

module.exports = routes