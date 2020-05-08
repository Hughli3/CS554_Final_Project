import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import logo from './img/logo.png';
import './App.css';
import app from "./componments/auth/AuthBase"

import Home from "./componments/Home"
import Property from "./componments/Property"
import SingleProperty from "./componments/SingleProperty"
import Account from "./componments/account/Account"

import Login from "./componments/auth/Login"
import Signup from "./componments/auth/Signup"
import { AuthProvider } from "./componments/auth/Auth";
import PrivateRoute from "./componments/auth/PrivateRoute";

function App() {
  let isLoggedIn = app.auth().currentUser
  return (
      <div className="App">
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to the Pokedex</h1>
        </header>

        <AuthProvider>
          <Router>

        <div className="App-body">
          <ul>
            <li>
              <Link className='Homelink' to='/'>Home</Link>
            </li>
            <li>
              <Link className='HousePropertylink' to='/property'>property</Link>
            </li>
            {isLoggedIn ? (
              <li>
                <Link className='Accountlink' to='/account'>account</Link>
              </li>
            ) : (
              <div>
                <li>
                  <Link className='Loginlink' to='/login'>login</Link>
                </li>
                <li>
                  <Link className='Signuplink' to='/signup'>signup</Link>
                </li>
              </div>
            )}
          </ul>
        </div>

        <Route exact path='/' component={Home}/>
        <Route exact path='/property' component={Property}/>
        <Route exact path='/property/:id' component={SingleProperty}/>

        <PrivateRoute exact path='/account' component={Account}/>

        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' component={Signup}/>

      </Router>
    </AuthProvider>
    </div>
  );
}

export default App;
