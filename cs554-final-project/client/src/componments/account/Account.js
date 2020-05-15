import React, {Component, useState, useContext} from 'react';
import { AuthContext } from "../auth/Auth";
import Watchlist from "./Watchlist";
import Property from "./Property";
import AddProperty from "./AddProperty";

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
        <section class="section account">
            <div class="container">
                {/* <h1 className='mb-5'>Account</h1> */}
                <div className="row">
                    <div className="col-md-4 col-12">
                        <h1>{currentUser.email}</h1>
                        <p>Use Uid: {currentUser.uid}</p>
               
                        <div>
                            <Link className='' to='/account/watchlist'>
                                <button className="btn m-3 w-100 btn-secondary">my watchlist</button>
                            </Link>
                        </div>
                        <div>
                            <Link className='' to='/account/property'>
                                <button className="btn m-3 w-100 btn-secondary">my property</button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-8 col-12">
                        <PrivateRoute exact path='/account/property/add' component={AddProperty}/>
                        <PrivateRoute exact path='/account/property' component={Property}/>
                        <PrivateRoute exact path='/account/watchlist' component={Watchlist}/>
                        <PrivateRoute exact path='/account/editProfile' component={Watchlist}/>
                    </div>
                </div>
            </div>
        </section>
    )
}