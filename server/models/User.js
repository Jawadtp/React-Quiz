const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
{
    userID:
    {
        type: String
    },
    name: 
    {
        type: String,
        required: true
    },
    imgURL: 
    {
        type: String,
        required: true,
    },
    email:
    {
        type: String,
        required: true
    },
    isAdmin:
    {
        type: Boolean,
        default: false,
    },
    lastLogin:
    {
        type: Date,
        default: Date.now()   
    }

})


module.exports = mongoose.model('User', userSchema)
