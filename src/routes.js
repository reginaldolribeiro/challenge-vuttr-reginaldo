const express = require('express')
const routes = express.Router()
const ToolsController = require('../src/controllers/ToolsController')
const LoginController = require('../src/controllers/LoginController')
const authMiddleware = require('../src/middlewares/auth')

routes.post('/register', LoginController.register)
routes.post('/authenticate', LoginController.authenticate)

routes.use(authMiddleware)

routes
    .get('/tools', ToolsController.findAll)
    .post('/tools', ToolsController.store)

routes
    .get('/tools/:id', ToolsController.findById)
    .put('/tools/:id', ToolsController.update)
    .delete('/tools/:id', ToolsController.delete)


module.exports = routes