// Routes.js
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import QuizWelcome from '../screens/QuizWelcome'
import QuizPlayScreen from '../screens/QuizPlayScreen'
import QuizResult from '../screens/QuizResult'

export default () => (
<BrowserRouter>
    <Switch>
      <Route exact path="/" component={QuizWelcome}/>
      <Route exact path="/play" component={QuizPlayScreen}/>
      <Route exact path="/result" component={QuizResult}/>
    </Switch>
</BrowserRouter>
);