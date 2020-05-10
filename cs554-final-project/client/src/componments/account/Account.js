import React, {Component, useState, useContext} from 'react';
import { AuthContext } from "../auth/Auth";
import Watchlist from "./Watchlist";
import Property from "./Property";

import PrivateRoute from "../auth/PrivateRoute";

import Avatar from './Avatar';
import { Link } from 'react-router-dom';

export default function Account(){
    const { currentUser } = useContext(AuthContext);
    // const [loading, setLoading] = useState(true);
  
    // useEffect(() => {
    //   app.auth().onAuthStateChanged((user) => {
    //     setCurrentUser(user)
    //     setPending(false)
    //   });
    // }, []);

    // const [account, setAccount] = useState();
    
    return(
        <div>
            <h1 className='cap-first-letter'>Account</h1>
            <p>User Name: {currentUser.email}</p>
            <ul>
                <li><Link className='' to='/account/watchlist'>watchlist</Link></li>
                <li><Link className='' to='/account/property'>my property</Link></li>
            </ul>
            <PrivateRoute exact path='/account/property' component={Property}/>
            <PrivateRoute exact path='/account/watchlist' component={Watchlist}/>
            <PrivateRoute exact path='/account/editProfile' component={Watchlist}/>
        </div>
        
    )
}