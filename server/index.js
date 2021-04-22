const express= require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(express.json({limit: '10mb', extended: true}))
app.use(express.urlencoded({limit: '10mb', extended: true}))

app.use(cors())

app.get('/', (req, res) => 
{
    const questions = 
    [
      {
        id: 1,
        question: "Which of the following is the largest animal in the world?",
        options: ["Giraffe", "Kangaroo", "Blue whale", "Elephant"],
         correct: "Blue whale"
      },
      {
        id: 2,
        question: "Which of the following is the tallest building in the world?",
        options: ["Taipei 101", "Clock Towers", "Eiffel Towel", "Burj Khalifa"],
        correct: "Burj Khalifa"
      },
      {
        id: 3,
        question: "Which of the following is a frontend framework?",
        options: ["Express.js", "React.js", "Moment.js", "Passport.js"],
        correct: "React.js"
      },
    ]
    res.send(questions)
})

app.listen(process.env.PORT || 5000, function(){console.log('Server running on PORT 5000')})




