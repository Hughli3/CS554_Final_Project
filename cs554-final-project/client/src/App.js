import React from 'react';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
// import logo from './img/logo.png';

import Home from "./componments/Home"
import Property from "./componments/Property"
import SingleProperty from "./componments/SingleProperty"
import Account from "./componments/account/Account"
import Header from "./componments/Header"
import Footer from "./componments/Footer"

import Login from "./componments/auth/Login"
import Signup from "./componments/auth/Signup"
import { AuthProvider } from "./componments/auth/Auth";
import PrivateRoute from "./componments/auth/PrivateRoute";

import "./assest/css/argon.css"
import "./assest/vender/font-awesome/css/all.min.css"
import "./assest/css/main.css"

function App() {
  
  return (
        <AuthProvider>
          <Router>
            {/* <Header /> */}
            <Route path='/' component={Header}/>

            <main>
            <Route exact path='/' component={Home}/>
			
            <Route exact path='/image' component={Image}/>

            <Route exact path='/property' component={Property}/>
            <Route exact path='/property/:id' component={SingleProperty}/>

            <PrivateRoute path='/account' component={Account}/>
            </main>

            <Switch>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/signup' component={Signup}/>
              <Route path='/' component={Footer}/>
            </Switch>
            
          </Router>
        </AuthProvider>
  );
}

export default App;
