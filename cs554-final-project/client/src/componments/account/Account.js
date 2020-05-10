import React, {Component, useState} from 'react';
import Avatar from './Avatar';

export default function Account(props){
    const [account, setAccount] = useState();
    
    return(
        <div>
            <Avatar user={props.user} />
            <p>User Name: {props.user.name}</p>
        </div>
    )
}