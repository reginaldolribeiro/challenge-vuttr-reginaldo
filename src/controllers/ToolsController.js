const Tools = require('../models/Tools')
const mongoose = require('mongoose')

module.exports = {

    async findAll(req, res) {

        let tools = null
        const { page, limit, sort } = req.query
        const options = {
            page: page || 1,
            limit: limit || 10,
            sort: sort || '-createdAt'
        }

        if (req.query.tag !== undefined) {
            const { tag } = req.query
            tools = await Tools.paginate({ tags: tag }, options )
        } else {
            tools = await Tools.paginate({}, options)
        }

        if (tools.totalDocs === 0) return res.status(404).json({ error: "Tools not found!" })

        return res.json(tools)

    },

    async findById(req, res) {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID!" })
        }

        if (!id) return res.status(400).json({ error: "ID is required!" })

        try {
            const tool = await Tools.findById(id)
            if (!tool) return res.status(404).json({ error: "Tool not found!" })
            
            return res.json(tool)
        } catch (err) {
            return res.status(400).send({ error: "Error loading tool!" })
        }

    },

    async update(req, res) {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID!" })
        }

        if (!id) return res.status(400).json({ error: "ID is required!" })

        try {
            const tool = await Tools.findByIdAndUpdate(id, req.body, {
                new: true
            })
            return res.json(tool)
        } catch (err) {
            return res.status(400).send({ error: "Error updating tool!" })
        }
    },

    async store(req, res) {        

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

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "Invalid ID!" })
        }

        if (!id) return res.status(400).json({ error: "ID is required!" })

        try {
            await Tools.findByIdAndRemove(id)
            return res.status(204).send()
        } catch (err) {
            return res.status(400).send({ error: "Error deleting tool!" })
        }

    }

}
