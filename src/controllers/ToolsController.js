const Tools = require('../models/Tools')

module.exports = {

    async findAll(req, res){

        console.log("Printando a query " + req.query)
        if(req.query.tag !== undefined){
            console.log(" *** Query ***")
            const { tag } = req.query
            console.log("Tag " + tag)
            const tools = await Tools.find({ tags: tag })
            return res.json(tools)
        } else {
            console.log(" *** Sem Query ***")
            const tools = await Tools.find().sort('-createdAt')
            tools.map(t => console.log(t.title))
            return res.json(tools)
        }

        
        return res.send()

        // await Tools.find().sort('-createdAt')
        //     .then(tools => {
        //         //console.log("Promise " + tools)
        //         res.json(tools)
        //     })
        //     .catch(err => err)

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
        if(!title || !link) return res.status(400).json({ error: "Campos obrigatorios nao foram informados."})

        const tool = await Tools.create({
            title, link, description, tags
        })
        
        return res.status(201).json(tool)
    },

    async delete(req,res){
        const { id } = req.params
        if(!id) return res.status(400).json({ error: "ID nao informado"})

        await Tools.findByIdAndRemove(id)

        return res.status(204).send()
    }

}