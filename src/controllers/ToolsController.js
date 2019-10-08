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
        }

        if (tools.length === 0) return res.status(404).json({ error: "Tools not found!" })
        
        return res.json(tools)

    },

    async findById(req, res) {
        const { id } = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ error: "Invalid ID!" })
        }

        if (!id) return res.status(400).json({ error: "ID is required!" })

        try{
            const tool = await Tools.findById(id)
            if (!tool) return res.status(404).json({ error: "Tool not found!" })
            return res.json(tool)
        } catch (err) {
            return res.status(400).send({ error: "Error loading tool!" })
        }              
        
    },

    async update(req, res) {
        const { id } = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ error: "Invalid ID!" })
        }

        if (!id) return res.status(400).json({ error: "ID is required!" })

        try{
            const tool = await Tools.findByIdAndUpdate(id, req.body, {
                new: true
            })
            return res.json(tool)
        } catch (err) {
            return res.status(400).send({ error: "Error updating tool!" })
        }
    },

    async store(req, res) {
        //console.log(req.body)

        const { title, link, description, tags } = req.body
        if (!title || !link) return res.status(400).json({ error: "Invalid Tool!" })

        try {
            const tool = await Tools.create({
                title, link, description, tags
            })
            return res.status(201).json(tool)
        } catch (err) {
            return res.status(400).send({ error: "Error creating tool!" })
        }

    },

    async delete(req, res) {
        const { id } = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({ error: "Invalid ID!" })
        }

        if (!id) return res.status(400).json({ error: "ID is required!" })

        try{
            await Tools.findByIdAndRemove(id)
            return res.status(204).send()
        } catch(err){
            return res.status(400).send({ error: "Error deleting tool!" })
        }

    }

}
