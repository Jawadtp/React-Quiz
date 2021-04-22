import '../App.css'
import axios from 'axios'
import {useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Quizcard from '../components/Quizcard'
import Quizresult from './QuizResult'

let qid=0
let response=[]


const QuizPlayScreen = (props) =>
{

  const [counter, setCounter] = useState(props.maxtime)
    const questions=props.questions
  useEffect(() => 
  {
    if(!quizOver)
    {
      const p = ((props.maxtime-counter)/props.maxtime)*100
      document.getElementsByClassName('timeleft')[0].style.width = `${p}%`
      if(counter > 0) 
      {
        setTimeout(() => setCounter(counter - 1), 10);
      }
      else onSubmitClick()
    }
  }, [counter]);


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

export default QuizPlayScreen;
