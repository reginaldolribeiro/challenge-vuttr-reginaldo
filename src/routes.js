const express = require('express')
const routes = express.Router()
const ToolsController = require('../src/controllers/ToolsController')
const LoginController = require('../src/controllers/LoginController')
const authMiddleware = require('../src/middlewares/auth')

routes.post('/register', LoginController.register)
routes.post('/authenticate', LoginController.authenticate)

routes.use(authMiddleware)

routes.get('/tools', ToolsController.findAll)
routes.get('/tools/:id', ToolsController.findById)
routes.post('/tools', ToolsController.store)
routes.put('/tools/:id', ToolsController.update)
routes.delete('/tools/:id', ToolsController.delete)

routes.get('/', (req,res) => {
    return res.send({ ok: true, user: req.userId })
})

module.exports = routes