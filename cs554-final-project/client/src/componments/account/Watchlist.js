import React, { useEffect, useState } from "react"
import WatchListProperty from "./WatchlistProperty"


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
export default function WatchList() {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);
    const [property, setProperty] = useState(props.WatchList);

    useEffect(() => {
        console.log("WatchList has ben called")
        app.auth().onAuthStateChanged((user) => {
          setCurrentUser(user);
          setPending(false);
          setProperty({
            uid:123456,
            title:"1125 Jefferson",
            price:3600,
            bedroom:3,
            contact:"email@stevens.edu"
          });
        });
      }, []);

    const watchListComponents = watchList.map(listProperty =>  <WatchListProperty key={listProperty.uid} property = {listProperty} />)
    return (
        <div>
            {watchListComponents}
        </div>
    )
}
