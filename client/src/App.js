import './App.css';
import axios from 'axios'
import {useEffect, useState} from 'react'


import QuizPlayScreen from './screens/QuizPlayScreen'
import QuizWelcome from './screens/QuizWelcome'

var x=1
function App() 
{

  const [page, setPage] = useState('welcome')

  function changePage(page)
  {
   // 
    if(x===5) setPage(page)
    x++
  }

  return (
    page==='welcome'?<QuizWelcome onPlayClick={changePage('play')}/>:
    page==='play'?<QuizPlayScreen maxtime={1000}/>:''
  )
  /*

  if(page === 'welcome')
  return ( <QuizWelcome onPlayClick={changePage('play')}/> ) //100 = 1s
  else if(page==='play') return ( <QuizPlayScreen maxtime={1000}/> ) //100 = 1s
                   */
      
    
}

export default App;
