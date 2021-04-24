import './App.css';
import axios from 'axios'
import {useEffect, useState} from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory
} from 'react-router-dom'
import QuizPlayScreen from './screens/QuizPlayScreen'
import QuizWelcome from './screens/QuizWelcome'
import Quizresult from './screens/QuizResult';
import QuizAdd from './screens/QuizAdd'
var x=1
function App() 
{
  let history = useHistory();
  const [page, setPage] = useState('welcome')

  


  return (
    <Router>
      
      <Switch>
            <Route path="/result" render={(props)=> <Quizresult {...props}/>}>
            </Route>

            <Route path="/play" render={(props)=> <QuizPlayScreen {...props}/>}>
            </Route>

            <Route path="/add" render={(props)=> <QuizAdd {...props}/>}>
            </Route>

            <Route path="/" render={(props)=> <QuizWelcome {...props}/>}>
            </Route>

         
      </Switch>
      
     </Router>
  
  )

    
}

export default App;
