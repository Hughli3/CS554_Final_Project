import React, { useEffect, useState, useContext } from "react"
import WatchlistProperty from "./WatchlistProperty"
import { AuthContext } from "../auth/Auth";

export default function WatchList(props) {
    const { currentUser } = useContext(AuthContext);
    const [pending, setPending] = useState(true);
    // TODO change below to props
    const [properties, setProperties] = useState([]);

    let myWatchList =  [
        {
            uid:123456,
            title:"1125 Jefferson",
            price:3600,
            bedroom:3,
            contact:"email@stevens.edu"
        },
        {
            uid:654321,
            title:"1125 Hason",
            price:3600,
            bedroom:3,
            contact:"email@gmail.com"
        },
        {
            uid:456123,
            title:"3215 Hason",
            price:2600,
            bedroom:2,
            contact:"email@gmail.com"
        }
    ]

    useEffect(() => {
        console.log("WatchList has ben called")
        setPending(false);
        // TODO Change below to 
        setProperties(myWatchList);
      }, []);

    const watchlistComponents = properties.map(listProperty =>  <WatchlistProperty key={listProperty.uid} property = {listProperty} />)
    return (
        <div>
            {watchlistComponents}
        </div>
    )
}
