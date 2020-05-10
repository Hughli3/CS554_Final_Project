import React, {Component, useState, useContext} from 'react';
import { AuthContext } from "../auth/Auth";
import Avatar from './Avatar';

export default function Account(props){
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
        </div>
    )
    // return (<div></div>)
}