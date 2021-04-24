import {useState} from 'react'
import QuizWelcome from './QuizWelcome';

const Quizresult = (props) => 
{
    const [reset, resetQuiz]=useState(false)
    const {response} = props.location.state.response
   const questionCount = response.length;
    var correct=0
    var wrong=0
    response.forEach(resp => 
    {
        if(resp.selected===resp.correct) correct++
        else if(resp.selected!=='') wrong++
    })

    function resetClick()
    {
       
       props.history.push({pathname: '/'})
       window.location.reload()

    }
    return (
        <>
        {!reset?
       <div className="center">
           <h1>Correct: {correct}</h1>
           <h1>Wrong: {wrong}</h1>
           <h1>Total questions: {questionCount}</h1>
           <button onClick={resetClick}>Reset</button>
       </div>:<QuizWelcome/>}
       </>
    )
}

export default Quizresult
