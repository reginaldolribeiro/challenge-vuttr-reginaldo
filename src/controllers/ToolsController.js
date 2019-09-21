const Tools = require('../models/Tools')

module.exports = {

    async findAll(req, res){

        if(req.query){
            const { tag } = req.query
            console.log(tag)
        } else {
            const tools = await Tools.find().sort('-createdAt')
            tools.map(t => console.log(t.title))
            return res.json(tools)
        }

        return res.send()

    },

    async findById(req,res){
        const { id } = req.params
        if(!id) return res.status(400).json({ error: "ID nao informado"})

        const tool = await Tools.findById(id)
        return res.json(tool)
    },

    async update(req,res){
        const { id } = req.params
        if(!id) return res.status(400).json({ error: "ID nao informado"})

        const tool = await Tools.findByIdAndUpdate(id, req.body, {
            new: true
        })
        return res.json(tool)
    },

    async store(req, res){
        console.log(req.body)
        
        const { title, link, description, tags } = req.body
        if(!title || !link) return res.status(400).json({ error: "Campos obrigatorios"})

        const tool = await Tools.create({
            title, link, description, tags
        })
        
        return res.status(201).json(tool)
    },

    async delete(req,res){
        await Tools.findByIdAndRemove(req.params.id)

        return res.status(204).send()
    }

}