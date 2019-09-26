const Tools = require('../models/Tools')
const mongoose = require('mongoose')

module.exports = {

    async findAll(req, res) {

        let tools = null
        if (req.query.tag !== undefined) {
            const { tag } = req.query
            tools = await Tools.find({ tags: tag })
        } else {
            tools = await Tools.find().sort('-createdAt')
            //tools.map(t => console.log(t.title))            
        }

        if (!tools) return res.status(404).json({ error: "Dados nao encontrados" })

        return res.json(tools)


    },

    async findById(req, res) {
        const { id } = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({ error: "ID invalido" })
        }

        if (!id) return res.status(400).json({ error: "ID nao informado" })

        const tool = await Tools.findById(id)
        return res.json(tool)
    },

    async update(req, res) {
        const { id } = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({ error: "ID invalido" })
        }

        if (!id) return res.status(400).json({ error: "ID nao informado" })

        const tool = await Tools.findByIdAndUpdate(id, req.body, {
            new: true
        })
        return res.json(tool)
    },

    async store(req, res) {
        //console.log(req.body)

        const { title, link, description, tags } = req.body
        if (!title || !link) return res.status(400).json({ error: "Campos obrigatorios nao foram informados." })

        try {
            const tool = await Tools.create({
                title, link, description, tags
            })
            return res.status(201).json(tool)
        } catch (err) {
            return res.status(400).send({ error: "Erro ao cadastrar uma nova ferramenta" })
        }

    },

    async delete(req, res) {
        const { id } = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({ error: "ID invalido" })
        }
        
        if (!id) return res.status(400).json({ error: "ID nao informado" })

        await Tools.findByIdAndRemove(id)

        return res.status(204).send()
    }

}