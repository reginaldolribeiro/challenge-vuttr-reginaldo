const User = require('../models/User')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function generateToken(params = {}){
    return jwt.sign(params, process.env.APP_SECRET, {
        expiresIn: 86400
    })
}

module.exports = {
    
    async register(req,res){

        console.log(" USER " + req.body.email)
        
        const { email } = req.body

        try{
            if(await User.findOne({ email }))
                return res.status(400).send({ error: "User already exists!"})

            const user = await User.create(req.body)

            user.password_hash = undefined

            return res.send({ 
                user, 
                token: generateToken({ id: user.id }),
            })

        }catch(err){
            return res.status(400).send({ error: "Registration failed!" })
        }
                
    },

    async authenticate(req,res){
        
        const { email, password_hash } = req.body
        
        const user = await User.findOne({ email }).select('+password_hash')

        if(!user)
            return res.status(404).send({ error: "User not found!" })

        if(!await bcrypt.compare(password_hash, user.password_hash))
            return res.status(400).send({ error: "Invalid password!" })

        user.password_hash = undefined

        return res.send({ 
            user, 
            token: generateToken({ id: user.id }),
        })

    }

}