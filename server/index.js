const express= require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const keys = require('./config/keys')
const { mongoDBURI } = require('./config/keys')
const mongoose = require('mongoose')
const User = require('./models/User')
const Quiz = require('./models/Quiz')
const Response = require('./models/Response')

app.use(express.json({limit: '10mb', extended: true}))
app.use(express.urlencoded({limit: '10mb', extended: true}))
app.use(cors())
/*
app.use(cors({origin: 'http://localhost:3000/',
credentials: true}))
*/
require('dotenv').config({path: '.env'})
mongoose.connect(process.env.mongoDBURI, 
  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
  })

  const db=mongoose.connection
  db.on('error', (error) => {console.error(error)})
  db.once('open', () => console.log("Connected to Mongoose"))




app.get('/', async (req, res) => 
{
  /*
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
    */
    var quizzes = await Quiz.find()
    //res.send(quizzes[1].questions)
    res.send(quizzes)
})

app.get('/attempt', async (req, res) => 
{
  
  const resp = await Response.findOne({quiz: req.query.quizid, user: req.query.userid})
  res.send(resp)
})

app.post('/login', async (req, res) => 
{
  console.log('Request received: ' + JSON.stringify(req.body))
  const currentUser = await User.findOne({userID: req.body.googleId})
  console.log('Variable currentUser: ' + JSON.stringify(currentUser))
  if(currentUser)
  {
    currentUser.lastLogin = Date.now()
    await currentUser.save()
    res.send(currentUser)
  }
  else
  {
    const newUser = new User(
    {
      userID: req.body.googleId,
      name: req.body.name,
      imgURL: req.body.imageUrl,
      email:req.body.email,
      isAdmin: false,
    })
    await newUser.save()
    res.send(newUser)
  }
})


app.post('/add', async (req, res) => 
{
  let quiz = req.body
  var i = 0
  quiz.questions.forEach(question => 
  {
     question.id = ++i
      question.options.push(question.correct)
  })
  
  var newQuiz = new Quiz
  ({
    name: quiz.name,
    desc: quiz.desc,
    time: quiz.time,
    author: quiz.author._id,
    questions: quiz.questions
  })
  await newQuiz.save()
  console.log('Quiz received from client: ' + JSON.stringify(quiz))
  res.send('Quiz saved in database')
})


app.post('/attempt', async (req, res) => 
{
  const newResponse = new Response(req.body)
  await newResponse.save()
  res.send('Response added to database')
})

app.listen(process.env.PORT || 5000, function(){console.log('Server running on PORT 5000')})



