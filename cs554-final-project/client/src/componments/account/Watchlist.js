import React, { useEffect, useState, useContext } from "react"
// import WatchlistProperty from "./WatchlistProperty"
import serverController from '../../serverController';
import { AuthContext } from "../auth/Auth";

export default function WatchList(props) {
    const { currentUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    // TODO change below to props
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const {data: resData} = await serverController.getWatchlist(currentUser)
                console.log(resData.details)
                setProperties(resData.details)
                setLoading(false);
            } catch (e) {
                setLoading(false);
            }
        }
        fetchData();
    },
    []);

    const removeWatchlist = async (pid) => {
		try {
			const {data: resData} = await serverController.removeWatchlist(pid, currentUser)
			setProperties(resData.details)
		} catch (error) {
			console.log(error);
		}
	};

    if (loading) {
		return (
			<div className='show-body'>
				<p>loading...</p>
			</div>
		);
    }
    
    if (!properties) {
        return (
            <div className='show-body'>
                <p>empty</p>
            </div>
        )
    }

    const watchlistComponents = properties.map(property => {
        return (
        <div key={property._id}>
            <a className='cap-first-letter' href={`/property/${property._id}`}> {property.title} </a>
            <button onClick={() => removeWatchlist(property._id)}>remove</button>
        </div>)
    })

    return (
        <div>
            {watchlistComponents}
        </div>
    )
}
