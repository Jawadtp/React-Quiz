// setReponse function doesnt update response properly


import '../App.css'
import axios from 'axios'
import {useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Quizcard from '../components/Quizcard'
import Quizresult from './QuizResult'
/*
let qid=0
let response=[]
*/
console.log("Here up above the sky")



const QuizPlayScreen = (props) =>
{
  
  const questions = props.location.state.quiz.questions
  const maxtime =  props.location.state.quiz.time*100
  const [qid, setQid] = useState(0)
  const [response, setResponse] = useState([])
  const [counter, setCounter] = useState(maxtime)
  const [attempt, setAttempt] = useState({})
  
 
  useEffect(() => 
  {
        
      const p = ((maxtime-counter)/maxtime)*100
      document.getElementsByClassName('timeleft')[0].style.width = `${p}%`
      if(p>75) document.getElementsByClassName('timeleft')[0].style.background = 'orange'
      if(p>95) document.getElementsByClassName('timeleft')[0].style.background = 'red'

      if(counter > 0) 
      {
        setTimeout(() => setCounter(counter - 1), 10);
      }
      else onSubmitClick()
   
  }, [counter]);

  useEffect(() => 
  {
    setCurrentQuestion(questions[qid])
    setSelected(response[qid].selected)
  }, [qid])

  if(response.length===0) 
  {
    let res=[]
    questions.forEach(question => 
    {
      
      res.push(
        {
          id: question.id,
          question: question.question,
          options: question.options,
          selected: '',
          correct: question.correct
        })
    })
    setResponse(res)
  }

  const [selected, setSelected] = useState('')
  const [question, setCurrentQuestion] = useState(questions[0])
  const [quizOver, setQuizOver] = useState(false)

  function onOptionClick(e)
  {
    setSelected(e.target.innerHTML)
    //response[qid].selected=e.target.innerHTML
  //  setResponse([...response, response[qid].selected=e.target.innerHTML])

      const newResp = 
      response.map((resp) => {
         if(resp.id-1===qid) return {...resp, selected: e.target.innerHTML}
         else return resp
      })

      setResponse(newResp)
    

    console.log(response[qid].selected)
    console.log(response[qid].correct)
    console.log('Current state of response: ')
    response.forEach((resp) => console.log(resp.selected))
  }

  function onClearClick()
  {
    const newResp = 
    response.map((resp) => {
       if(resp.id-1===qid) return {...resp, selected: ''}
       else return resp
    })
    setResponse(newResp)
    setSelected('')
  }

  function onNextClick()
  {
      setQid(qid+1) //On successful 'setting', useEffect gets called.
  }

  function onPrevClick()
  {
    
    setQid(qid-1)
    setCurrentQuestion(questions[qid])
    setSelected(response[qid].selected)
    console.log('Question id changed to: ' + qid)

  }

  function onSubmitClick()
  {
    var correct=0
    var wrong=0
    response.forEach(resp => 
    {
        if(resp.selected===resp.correct) correct++
        else if(resp.selected!=='') wrong++
    })
    
    const resp = 
    {
      score: (correct*4-wrong)/(response.length*4),
      response: response,
      quiz: props.location.state.quiz._id,
      user: props.location.state.user._id,
    }
    console.log('Response after population: ', JSON.stringify(resp))

    axios.post('http://localhost:5000/attempt/', resp)
    .then(r => 
        {
            console.log(r) // On success, r-> 'Response added to database'
            props.history.push({pathname: '/result', state: {response: resp}})

        })
    
  }

  
  

  return (
       <Quizcard quest = {question} onOptionClick={onOptionClick} onClearClick ={onClearClick} onNextClick = {onNextClick} onPrevClick ={onPrevClick} onSubmitClick={onSubmitClick} selected={selected} questionCount={questions.length}/> 
      
    )
}

export default QuizPlayScreen;




/*
import '../App.css'
import axios from 'axios'
import {useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Quizcard from '../components/Quizcard'
import Quizresult from './QuizResult'

let qid=0
let response=[]

console.log("Here up above the sky")



const QuizPlayScreen = (props) =>
{
  
  const questions = props.location.state.quiz.questions
  const maxtime =  props.location.state.quiz.time*100
  const [counter, setCounter] = useState(maxtime)
  const [attempt, setAttempt] = useState({})
  
  console.log(props.location.state.user)
  useEffect(() => 
  {

    
    
      const p = ((maxtime-counter)/maxtime)*100
      document.getElementsByClassName('timeleft')[0].style.width = `${p}%`
      if(p>75) document.getElementsByClassName('timeleft')[0].style.background = 'orange'
      if(p>95) document.getElementsByClassName('timeleft')[0].style.background = 'red'

      if(counter > 0) 
      {
        setTimeout(() => setCounter(counter - 1), 10);
      }
      else onSubmitClick()
   
  }, [counter]);

 
  if(response.length===0) questions.forEach(question => 
  {
    console.log('here')
    response.push(
      {
        id: question.id,
        question: question.question,
        options: question.options,
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
    var correct=0
    var wrong=0
    response.forEach(resp => 
    {
        if(resp.selected===resp.correct) correct++
        else if(resp.selected!=='') wrong++
    })
    
    const resp = 
    {
      score: (correct*4-wrong)/(response.length*4),
      response: response,
      quiz: props.location.state.quiz._id,
      user: props.location.state.user._id,
    }
    console.log('Response after population: ', JSON.stringify(resp))

    axios.post('http://localhost:5000/attempt/', resp)
    .then(r => 
        {
            console.log(r)
          //  alert('Quiz created successfully!')
           // props.history.push({pathname: '/result', state: {response: response,  correct: correct, wrong: wrong}})
            props.history.push({pathname: '/result', state: {response: resp}})


        })

  //  props.history.push({pathname: '/result', state: {response: response,  correct: correct, wrong: wrong}})
    
  }

  
  

  return (
       <Quizcard quest = {question} onOptionClick={onOptionClick} onClearClick ={onClearClick} onNextClick = {onNextClick} onPrevClick ={onPrevClick} onSubmitClick={onSubmitClick} selected={selected} questionCount={questions.length}/> 
      
    )
}

export default QuizPlayScreen;


*/