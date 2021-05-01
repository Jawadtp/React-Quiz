import {useState} from 'react'
import axios from 'axios'

const QuizWelcomeCard = (props) => 
{
    
      
    function onQuizWelcomeCardClick()
    {

        axios.get('http://localhost:5000/attempt', {params: {quizid: props.quiz._id, userid: props.user._id}}).then(res => 
        {
            console.log('Response from server: ' + JSON.stringify(res.data))
            
            if(res.data)
                props.prop.history.push({pathname: '/result', state: {response: res.data}})
            else
                props.prop.history.push({pathname: '/play', state: {quiz: props.quiz, user: props.user}})
        })

        /*
        if(attempt.loading) return
       if(attempt.loading) return
        if(attempt)
            props.prop.history.push({pathname: '/result', state: {response: attempt}})
        else
            props.prop.history.push({pathname: '/play', state: {quiz: props.quiz, user: props.user}})
        */
       // props.prop.history.push({pathname: '/play', state: {questions: props.quiz.questions, maxtime: props.quiz.time*100}}) //Props of parent is passed as a prop called 'prop' (as parent's props is required to props.history)
       // console.log('QuizWelcomeCard ' + JSON.parse(props.quiz))
    }
    return (
        <button onClick={onQuizWelcomeCardClick}>{props.quiz.name}</button>
    )
}

export default QuizWelcomeCard
