import axios from 'axios';
import React from 'react'
import {useState, useEffect} from 'react'
import QuizPlayScreen from './QuizPlayScreen'

const QuizWelcome = (props) => 
{
 /*   const questions = 
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
*/
    const [questions, setQuestions] = useState([])
    useEffect(() => 
    {
        axios.get('http://localhost:5000/').then(res => 
        {
            setQuestions(res.data)
        })
    });


    const [view, setView]=useState(0)
   function onPlayClick()
   {
      setView(1)
   }
    return (view===0?
        <>
            <h1>Welcome to Quiz App</h1>
            <button onClick={onPlayClick}>Play</button>
        </>:questions.length!==0?<QuizPlayScreen maxtime={500} questions={questions}/>:'Loading'
    )
}

export default QuizWelcome
