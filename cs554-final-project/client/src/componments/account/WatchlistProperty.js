import React, {useState, useEffect, useReducer} from 'react';
import NoMatch from "../NoMatch"

// let myWatchList =  
//         {
//             uid:123456,
//             title:"1125 Jefferson",
//             price:3600,
//             bedroom:3,
//             contact:"email@stevens.edu"
//         }

export function WatchlistProperty(props){

    return (
    <div className='App-body'>
    <p className='cap-first-letter'> {props.property.uid} </p>
    <p className='cap-first-letter'> {props.property.title} </p>
    <p className='cap-first-letter'> {props.property.price} </p>
    <p className='cap-first-letter'> {props.property.bedroom} </p>
    <p className='cap-first-letter'> {props.property.contact} </p>
</div>
)
    
    
}
