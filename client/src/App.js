import './App.css';
import axios from 'axios'
import {useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Quizcard from './components/Quizcard'
import Quizresult from './components/Quizresult'

let qid=0
let response=[]
const maxtime = 1000 //1000 implies 10seconds

function App() 
{

  const [counter, setCounter] = useState(maxtime)

  useEffect(() => 
  {
    if(!quizOver)
    {
      const p = ((maxtime-counter)/maxtime)*100
      document.getElementsByClassName('timeleft')[0].style.width = `${p}%`
      if(counter > 0) 
      {
        setTimeout(() => setCounter(counter - 1), 10);
      }
      else onSubmitClick()
    }
  }, [counter]);

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
  if(response.length===0) questions.forEach(question => 
  {
    console.log('here')
    response.push(
      {
        id: question.id,
        selected: '',
        correct: question.correct
      })
  });

  const [selected, setSelected] = useState(response[qid].selected)
  const [question, setCurrentQuestion] = useState(questions[0])
  const [quizOver, setQuizOver] = useState(false)

  function onOptionClick(e)
  {
    setSelected(e.target.innerHTML)
    response[qid].selected=e.target.innerHTML
    console.log(response[qid].selected)
    console.log(response[qid].correct)
    console.log('Current state of response: ')
    response.forEach((resp) => console.log(resp.selected))
  }

  function onClearClick()
  {
    setSelected('')
    response[qid].selected=''
  }

  function onNextClick()
  {
    qid++
    setCurrentQuestion(questions[qid])
    setSelected(response[qid].selected)
    console.log('Question id changed to: ' + qid)
  }

  function onPrevClick()
  {
    
    qid--
    setCurrentQuestion(questions[qid])
    setSelected(response[qid].selected)
    console.log('Question id changed to: ' + qid)

  }

  function onSubmitClick()
  {
  
     setQuizOver(true)
  }

  
  

  return (
    !quizOver?
    
      
      <Quizcard quest = {question} onOptionClick={onOptionClick} onClearClick ={onClearClick} onNextClick = {onNextClick} onPrevClick ={onPrevClick} onSubmitClick={onSubmitClick} selected={selected} questionCount={questions.length}/> 
    
    :<Quizresult response={response} test="hello"/>
    )
}

export default App;
