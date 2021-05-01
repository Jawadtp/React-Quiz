import axios from 'axios';
import React from 'react'
import {useState, useEffect} from 'react'
import QuizPlayScreen from './QuizPlayScreen'
import '../routes/routes' 
import { BrowserRouter, Route, Switch, Redirect, Link} from 'react-router-dom'
import ReactDOM, { render } from 'react-dom';
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import '../App.css'
import Login from '../components/Login'
import Logout from '../components/Logout'
import QuizWelcomeCard from '../components/QuizWelcomeCard'
import https from 'https'

const clientId = '329042819432-5pvtu2kl3msh6e12n30b2hldrn5epc6e.apps.googleusercontent.com'

const QuizWelcome = (props) => 
{
    
    
   // const [user, setUser] = useState({"state":"loading"})
    const [user, setUser] = useState({"state":"loading"})
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [questions, setQuestions] = useState([])
    const [quizzes, setQuizzes] = useState([])

    function onLogin(res)
    {
        setLoggedIn(true)   
        console.log('onLogin called')
        axios.post('http://localhost:5000/login/', res.profileObj)
        .then(response => 
            {
                console.log('Required thing xd: ' + JSON.stringify(response.data))
                setUser(response.data)

            });

       // console.log('Login successful: ' + JSON.stringify(res.profileObj))
    }
    function onLoginFail(res)
    {
        console.log('Failed to login: ' + res)
    }

    function onLogout()
    {
        setLoggedIn(false)
        console.log('User logged out successfully')
    }

    

    function onQuizAddClick()
    {
        props.history.push({pathname: '/add', state: {user: user}})
    }
    useEffect(() => 
    {
        axios.get('http://localhost:5000/').then(res => 
        {
           setQuizzes(res.data)
        })
    });


    return ( <>
        <h1>Welcome to Quiz App</h1>
        {user.state!=="loading" && isLoggedIn? <h2>Hello, {user.name}</h2>:''}
        {!isLoggedIn?
        <Login onLogin={onLogin}/>:
        <Logout onLogout={onLogout}/>
        }
        {user.state!="loading"?quizzes.map((quiz) => 
        {
            return <QuizWelcomeCard user={user} quiz={quiz} prop={props}/>
        }):''}
        {user.isAdmin?<button className="addQuizBtn" onClick={onQuizAddClick}>+</button>:''}
    </>)
}

export default QuizWelcome

