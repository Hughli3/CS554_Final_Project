import React, {Component, useState, useContext} from 'react';
import { AuthContext } from "../auth/Auth";
import Watchlist from "./Watchlist";
import Property from "./Property";
import AddProperty from "./AddProperty";
import EditProperty from "./EditProperty";

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
                    <div className="col-md-3 col-12">
                        <div class="avatar-container">
                            <img src="{{#if user.avatar}}{{user.avatar}}{{else}}/public/img/avatar/default-user.png{{/if}}" id="user-avatar" class="img-fluid avatar" alt="user avatar" width="300" />                
                        </div>
                        {currentUser.email ? (
					        <div class="icon-group mt-4">
                                <p>
                                    <i class="fas fa-user"></i>{currentUser.email} 
                                </p>
                            </div>) : null}
                        {currentUser.phone ? (
                        <div class="icon-group my-3">
                            <p>
                                <i class="fas fa-phone"></i>{currentUser.phone}
                            </p>
                        </div>) : null}
                        <div>
                            <Link className='' to='/account/watchlist'>
                                <button className="btn my-3 w-100 btn-secondary">My watchlist</button>
                            </Link>
                        </div>
                        <div>
                            <Link className='' to='/account'>
                                <button className="btn my-3 w-100 btn-secondary">My property</button>
                            </Link>
                        </div>
                        <div>
                            <Link className='' to='/account/edit'>
                                <button className="btn my-3 w-100 btn-secondary">Edit profile</button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-9 col-12">
                        <PrivateRoute exact path='/account/' component={Property}/>
                        <PrivateRoute exact path='/account/property/add' component={AddProperty}/>
                        <PrivateRoute exact path='/account/watchlist' component={Watchlist}/>
                        <PrivateRoute exact path='/account/property/:id' component={EditProperty}/>
                    </div>
                </div>
            </div>
        </section>
    )
}