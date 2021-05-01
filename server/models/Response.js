const mongoose = require('mongoose')

const responseSchema = new mongoose.Schema(
{
   
    score: 
    {
        type: Number,
        required: true
    },
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    quiz:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Quiz'
    },
    response:  //Array of objects
    [
        {
            id: Number, 
            question: String, 
            options: [String],
            selected: String,
            correct: String,
        }
    ]
  
  
})


module.exports = mongoose.model('Response', responseSchema)
