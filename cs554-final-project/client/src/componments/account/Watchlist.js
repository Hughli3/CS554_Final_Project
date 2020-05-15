import React, { useEffect, useState, useContext } from "react"
// import WatchlistProperty from "./WatchlistProperty"
import serverController from '../../serverController';
import { AuthContext } from "../auth/Auth";
import { Link } from 'react-router-dom';

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

    const handleDelete = async (event) => {
        event.preventDefault();
        let propertyId = event.target.getAttribute('data-property')
		try {
			const {data: resData} = await serverController.removeWatchlist(propertyId, currentUser)
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

    const watchlistComponents = properties.length == 0 ? (
            <div class="row property-card property-watch-empty mb-3">
                <Link class="align-self-center d-flex align-items-center justify-content-center" to='/property'>
                    <div>
                        <p><i class="fas fa-eye"></i></p>
                        <p>Your Watchlist is Empty</p>
                    </div>
                </Link>
            </div>
        ) : properties.map(property => {
        return (
        <>
			<div class="row property-card mb-4">
				<div class="col-lg-6 col-md-4 col-6 pl-0">
                    <Link to={'/property/' + property._id}>
                        {property.avatar ?
                        (<img src="https://cdngeneral.rentcafe.com/dmslivecafe/3/509605/Avant-Apartments-Parking-Garage-Entrance-Carmel,-Indiana_WEB.jpg" class="card-img-left" alt="property image" />)
                        :
                        (<img src="https://cdngeneral.rentcafe.com/dmslivecafe/3/509605/Avant-Apartments-Parking-Garage-Entrance-Carmel,-Indiana_WEB.jpg" class="card-img-left" alt="property image" />)
                        }
                    </Link>
				</div>
				<div class="col-lg-6 col-md-4 col-6 py-3">
					<Link to={'/property/' + property._id}>

						<h2 class="display-4" class="title">{property.title}</h2>
						</Link>
						{property.description ? (<p class="description">{property.description}</p>) : null}
					
						{ property.price || property.zipcode || property.type || property.bedroom || property.bath ?
						(<div class="icon-group">
							<p>
								{property.price ? (<><i class="fas fa-dollar-sign"></i>{property.price}</>): null}
								{property.zipcode ? (<><i class="fas fa-map-marker-alt"></i>{property.zipcode}</>): null}
								{property.type ? (<><i class="fas fa-building"></i>{property.type}</>): null}
								{property.bedroom ? (<><i class="fas fa-bed"></i>{property.bedroom}</>): null}
								{property.bath ? (<><i class="fas fa-bath"></i>{property.bath}</>): null}
							</p>
						</div>) : null	
						}
                    <button type="button" onClick={handleDelete} data-property={property._id} class="btn btn-danger btn-sm btn-round btn-shadow btn-delete-property position-absolute">delete</button>
				</div>
			</div>
		</>
		);
        // <div key={property._id}>
        //     <a className='cap-first-letter' href={`/property/${property._id}`}> {property.title} </a>
        //     <button onClick={() => removeWatchlist(property._id)}>remove</button>
        // </div>)
    })

    return (
        <div>
            {watchlistComponents}
        </div>
    )
}
