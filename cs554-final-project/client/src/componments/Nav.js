import React, { useCallback, useContext } from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "./auth/Auth";
import app from "./auth/AuthBase"
import PropertyList from './properties/PropertyList'
const Nav = () => {

    const { currentUser } = useContext(AuthContext);

    return (
        <ul>
        <li>
          <Link className='Homelink' to='/'>Home</Link>
        </li>
        <li>
          <Link className='HousePropertylink' to='/property'>property</Link>
        </li>
        {currentUser ? (
          <div>
            <li>
              <Link className='Accountlink' to='/account'>{currentUser.email}</Link>
            </li>
            <li>
              <button onClick={() => app.auth().signOut()}>Sign out</button>
            </li>
          </div>
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
    );
}

export default Nav;