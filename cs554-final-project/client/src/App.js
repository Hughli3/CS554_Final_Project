import React from 'react';

import {BrowserRouter as Router, Route} from "react-router-dom";
import logo from './img/logo.png';
import './App.css';

import Home from "./componments/Home"
import Property from "./componments/Property"
import SingleProperty from "./componments/SingleProperty"
import Account from "./componments/account/Account"
import Nav from "./componments/Nav"
import Login from "./componments/auth/Login"
import Signup from "./componments/auth/Signup"
import { AuthProvider } from "./componments/auth/Auth";
import PrivateRoute from "./componments/auth/PrivateRoute";

function App() {
  return (
      <div className="App">
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to the Pokedex</h1>
        </header>

        <AuthProvider>
          <Router>
            
            <div className="App-body">
              <Route path='/' component={Nav}/>
            </div>

            <Route exact path='/' component={Home}/>

            <Route exact path='/property' component={Property}/>
            <Route exact path='/property/:id' component={SingleProperty}/>

            <Route exact path='/login' component={Login}/>
            <Route exact path='/signup' component={Signup}/>
            <PrivateRoute exact path='/account' component={Account}/>

          </Router>
        </AuthProvider>
    </div>
  );
}

export default App;
