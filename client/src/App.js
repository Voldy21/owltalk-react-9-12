import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Navbar from './components/Navbar'
import CreateAccount from './components/CreateAccount';
import {OwltalkState} from './context/owltalkContext'

function App() {
  return (
      <OwltalkState>
        <Router>
            <Navbar/>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login}/>
              <Route path='/createaccount' component={CreateAccount}/>
            </Switch>
        </Router>
      </OwltalkState>
  );
}

export default App;
