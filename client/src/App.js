import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Navbar from './components/Navbar/Navbar'
import CreateAccount from './components/createAccount/CreateAccount';
// import Profile from './components/Profile/Profile'
import {OwltalkState} from './context/owltalkContext'


function App() {
  return (
      <OwltalkState>
        <Router>
            <Navbar/>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login}/>
              <Route exact path='/createaccount' component={CreateAccount}/>
              {/* <Route path='/profile/:id' component={Profile}/> */}
            </Switch>
        </Router>
      </OwltalkState>
  );
}

export default App;
