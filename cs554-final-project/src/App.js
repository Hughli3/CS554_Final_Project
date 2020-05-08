import React from 'react';
import logo from './img/logo.png';
import './App.css';

import Home from "./componments/Home"
import AllHouseProperty from "./componments/AllHouseProperty"
import HouseProperty from "./componments/HouseProperty"
import User from "./componments/User"
import Account from "./componments/Account"
import Login from "./componments/Login"
import Signup from "./componments/Signup"
import AccountProfile from "./componments/AccountProfile"
import AccountWatchlist from "./componments/AccountWatchlist"
import AccountAllProperty from "./componments/AccountAllProperty"
import AccountProperty from "./componments/AccountProperty"
import AccountAddProperty from "./componments/AccountAddProperty"
import NoMatch from "./componments/NoMatch"

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to the Pokedex</h1>
        </header>

        <div className="App-body">
          <ul>
            <li>
              <Link className='Homelink' to='/'>Home</Link>
            </li>
            <li>
              <Link className='HousePropertylink' to='/property'>property</Link>
            </li>
            <li>
              <Link className='Userlink' to='/user/1'>user</Link>
            </li>
            <li>
              <Link className='Accountlink' to='/account'>account</Link>
            </li>
            <li>
              <Link className='Loginlink' to='/account/login'>login</Link>
            </li>
            <li>
              <Link className='Signuplink' to='/account/signup'>signup</Link>
            </li>
            <li>
              <Link className='AccountProfilelink' to='/account/profile'>account profile</Link>
            </li>
            <li>
              <Link className='AccountWatchlistlink' to='/account/watchlist'>account watchlist</Link>
            </li>
            <li>
              <Link className='AccountPropertylink' to='/account/property'>account property</Link>
            </li>
            <li>
              <Link className='AccountAddPropertylink' to='/account/property/add'>account add Property</Link>
            </li>
          </ul>

          <p>Wekcome!</p>
        </div>

        <Route exact path='/' component={Home}/>
        <Route exact path='/account/login' component={Login}/>
        <Route exact path='/account/signup' component={Signup}/>

{/* 
        <Route exact path='/property' component={AllHouseProperty}/>
        <Route exact path='/property/:id' component={HouseProperty}/>
        <Route exact path='/user/:id' component={User}/>

        <Route exact path='/account' component={Account}/>

        <Route exact path='/account/profile' component={AccountProfile}/>
        <Route exact path='/account/watchlist' component={AccountWatchlist}/>
        <Route exact path='/account/property' component={AccountAllProperty}/>
        <Route exact path='/account/property/add' component={AccountAddProperty}/>
        <Route exact path='/account/property/:id' component={AccountProperty}/>
          
        <Route exact path='*' component={NoMatch} status={404}/> */}
      </div>
    </Router>
  );
}

export default App;
