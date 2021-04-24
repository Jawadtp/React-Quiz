import React from 'react'
import {useState, useEffect} from 'react'
import '../App.css'
import axios from 'axios'
import '../components/AddedQuestion'
import AddedQuestion from '../components/AddedQuestion'


const QuizAdd = (props) => {
    console.log(props.location.state.user)
    
    const [quiz, setQuiz] = useState(
    {
            name: '',
            desc: '',
            author: props.location.state.user,
            questions: [],
    }) 
    const [question, setQuestion] = useState(
        {
            id: 0,
            question: '',
            options: [],
            correct: ''
        }) 
    
    const [option, setOption] = useState('')
    const [questionString, updateQuestionStringState] = useState('')
    const [correctAnswer, updateCorrectAnswerState] = useState('')

    function addOptionClick()
    {
        if(option==='') return
        let newQuestion = question
        newQuestion.options.push(option)
        setQuestion(newQuestion)
        console.log('Updated state of question: '+ JSON.stringify(question))
        setOption('')
       
    }
    function onRemoveOptionClick(e)
    {
        let newQuestion = JSON.parse(JSON.stringify(question)) //Simple assignment doesn't cause a rerender on setQuestion
        
        var index = newQuestion.options.indexOf(e.target.name)
        newQuestion.options.splice(index, 1);
        
        setQuestion(newQuestion)
        console.log('Question after removal: ' + JSON.stringify(question))
    }

    function setQuestionString(e)
    {
        question.question = e.target.value
        setQuestion(question)
        updateQuestionStringState(e.target.value)
    }
    
    function setAnswer(e)
    {
        question.correct=e.target.value
        setQuestion(question)        
        updateCorrectAnswerState(e.target.value)
    }

    function  addQuestionToQuiz ()
    {
        //Validation
        if(question.question=='') return alert('Please enter a question!')
        else if(question.correct=='') return alert('Please enter the correct answer to the question!')
        else if(question.options.length==0) return alert('Please add at least one option')
        
        let newQuestion = question
        newQuestion.id = quiz.questions.length + 1
        let newQuiz = JSON.parse(JSON.stringify(quiz)) //Simple assignment doesn't cause a rerender on setQuestion
    //    console.log('question state before pushing ' + JSON.stringify(newQuestion))
       newQuiz.questions.push(newQuestion)
        //setQuiz(quiz => ({...quiz, questions: quiz.questions.push(newQuestion)}))
       setQuiz(newQuiz)
       // console.log('Quiz after addition of question: ' + JSON.stringify(quiz))
        setQuestion( {
            id: 0,
            question: '',
            options: [],
            correct: ''
        })

        updateQuestionStringState('')
        updateCorrectAnswerState('')

    }
    useEffect(() => {
        console.log('Quiz after addition of question: ' + JSON.stringify(quiz))// using camelCase for variable name is recommended.
      }, [quiz]); 

    function setQuizName(e)
    {
        let newQuiz = quiz
        newQuiz.name = e.target.value
        setQuiz(newQuiz)

    }

    function setQuizDesc(e)
    {
        let newQuiz = quiz
        newQuiz.desc = e.target.value
        setQuiz(newQuiz)
    }

    function onRemoveQuestionClick(e)
    {
        console.log(e.target.name)
       // let newQuestion = JSON.parse(JSON.stringify(question)) //Simple assignment doesn't cause a rerender on setQuestion
        var index
        for(var i=0; i<quiz.questions.length; i++)
        {
            if(quiz.questions[i].question===e.target.name) 
            {
                index = i;
                break;
            }
        }
        var newQuestions = quiz.questions
        newQuestions.splice(index, 1)
        //newQuestion.options.splice(index, 1);
        
        setQuiz({...quiz, questions: newQuestions})
     //   console.log('Question after removal: ' + JSON.stringify(question))
    }

    function onSubmitQuiz()
    {
        if(quiz.questions.length === 0) return alert('Please add at least one question')
        axios.post('http://localhost:5000/add/', quiz)
        .then(response => 
            {
                
               console.log(response)
            })

    }
    return (
        
            <div className="formWrapper">
                <h1>Create a new quiz</h1>
                <form>
                    <div className="quizInfo">
                        <div className="quizNameWrapper">               
                            <input type="text" className="nameInput addInput"placeholder="Quiz name" onChange={setQuizName}></input>
                        </div>
                        <br/>
                        <div className="quizDescWrapper">
                            <input type="text" className="descInput addInput" placeholder="Quiz description" onChange={setQuizDesc}></input>
                        </div>
                    </div>
                    {quiz.questions.length > 0?<h1>Added Questions</h1>:''}
                    <div className="addedQuestions">
                    {
                   
                    quiz.questions.map((quest)=>
                            {
                                return <AddedQuestion question={quest} onRemoveClick={onRemoveQuestionClick}/>
                            })
                                            
                        }
                    </div>
                    <h1>Add a question</h1>
                    <div className="quizQuestionWrapper">               
                        <input type="text" className="questionInput addInput"placeholder="Type a question  (eg: What's the tallest building?)" value = {questionString} onChange={setQuestionString}></input>
                    </div>
                    <br/>
                    <div className="quizCorrectWrapper">               
                        <input type="text" className="correctInput addInput"placeholder="What's the answer to the question? (Eg: Burj Khalifa)" value={correctAnswer} onChange={setAnswer}></input>
                    </div>
                    <br/>
                    <div className="quizOptionWrapper">    
                        {
                            
                            question.options.map((opt)=>
                            {
                                return <div className="addedOption"><div className="removeOptionWrapper"><button type="button" className="removeOptionBtn" name={opt} onClick={onRemoveOptionClick}>X</button></div><div className="optionText"> {opt} </div> </div>
                            })
                            
                        }
                        <button type="button" className="addOptionBtn" onClick={addOptionClick}>+</button>
                        <div className="optionInputWrapper"><input type="text" className="optionInput"placeholder="Add an option" value={option} onChange={e => setOption(e.target.value)}></input></div>
                    </div>
                    <br/>
                    <div className="footerBtns">
                        <button type="button" className="footerBtn addQuestionBtn" onClick={addQuestionToQuiz}>Add Question</button>
                        <button type="button" className="footerBtn submitQuizBtn" onClick={onSubmitQuiz}>Submit Quiz</button>
                    </div>
    
                </form>
            </div>
        
    )
}

export default QuizAdd

