import {useState} from 'react'
import QuizWelcome from './QuizWelcome';
import Score from '../components/Score'
import QuizResponse from '../components/QuizResponse';

const Quizresult = (props) => 
{
    const response = props.location.state.response.response
    const questionCount = response.length;

    var correct=0
    var wrong=0
    
    response.forEach(ques => 
    {
        if(ques.correct===ques.selected) correct++;
        else if(ques.selected!== '' && ques.selected!==ques.correct) wrong++;
    });
    
    function resetClick()
    {
       
      props.history.push({pathname: '/'})
       //window.location.reload()

    }
    return (
        <div className="resultWrapper">
            <button className="resultBackBtn" onClick={resetClick}>{`<`}</button>
            <Score correct={correct} wrong={wrong} questionCount={questionCount}/>
            <QuizResponse response={response}/>
        </div>
       
    )
}

export default Quizresult

//             <Score correct={props.location.state.correct} wrong={props.location.state.wrong} questionCount={questionCount}/>
