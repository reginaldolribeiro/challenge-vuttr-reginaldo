const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password_hash: {
        type: String,
        required: true,
        select: false
    }
},
{
    timestamps: true
})

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password_hash, 10)
    this.password_hash = hash

    next()
})

module.exports = mongoose.model('User', UserSchema)