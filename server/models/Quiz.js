const mongoose = require('mongoose')
const User = require('./User')
const quizSchema = new mongoose.Schema(
{
   
    name: 
    {
        type: String,
        required: true
    },
    desc: 
    {
        type: String,
        required: true,
    },
    time:
    {
        type: Number,
        required: true
    },
    author:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    questions:  //Array of objects
    [
        {
            id: Number, 
            question: String, 
            options: [String],
            correct: String
        }
    ]
  
  
})


module.exports = mongoose.model('Quiz', quizSchema)
