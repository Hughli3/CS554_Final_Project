import React, { useEffect, useState, useContext } from "react"
import serverController from '../../serverController';
import { AuthContext } from "../auth/Auth";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import { useAlert } from 'react-alert';

export default function WatchList(props) {
    const { currentUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    // TODO change below to props
    const [properties, setProperties] = useState([]);
	const alert = useAlert();

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const {data: resData} = await serverController.getWatchlist(currentUser)
                setProperties(resData.details)
                setLoading(false);
            } catch (e) {
                setLoading(false);
            }
        }
        fetchData();
    },
    [currentUser]);

    const handleDelete = async (event) => {
        event.preventDefault();
        let propertyId = event.target.getAttribute('data-property')
		try {
			const {data: resData} = await serverController.removeWatchlist(propertyId, currentUser)
            setProperties(resData.details)
            alert.success("successfully removed from watchlist")
		} catch (error) {
			alert.error(error.message)
		}
	};

    if (loading) {
        return (
            <div className="lds-facebook"><div></div><div></div><div></div></div>
        )
    }
    
    if (!properties) {
        return (
            <div className='show-body'>
            <Helmet>
                <title>WatchList - RentSIT</title>
            </Helmet>
                <p>empty</p>
            </div>
        )
    }

    const watchlistComponents = properties.length === 0 ? (
            <div className="row property-card property-watch-empty mb-3">
                <Link className="align-self-center d-flex align-items-center justify-content-center" to='/property'>
                    <div>
                        <p><i className="fas fa-eye"></i></p>
                        <p>Your Watchlist is Empty</p>
                    </div>
                </Link>
            </div>
        ) : properties.map(property => {
        return (
        <>
        <Helmet>
              <title>WatchList - RentSIT</title>
        </Helmet>
			<div className="row property-card mb-4">
				<div className="col-lg-6 col-md-4 col-6 pl-0">
                    <Link to={'/property/' + property._id}>
                        {property.album.length > 0 ?
                        (<img src={property.album[0]} className="card-img-left" alt="property" />)
                        :
                        (<img src="/img/default_property.jpg" className="card-img-left" alt="property" />)
                        }
                    </Link>
				</div>
				<div className="col-lg-6 col-md-4 col-6 py-3">
					<Link to={'/property/' + property._id}>

						<h2 className="display-4 title">{property.title}</h2>
						</Link>
						{property.description ? (<p className="description">{property.description}</p>) : null}
					
						{ property.price || property.zipcode || property.type || property.bedroom || property.bath ?
						(<div className="icon-group">
							<p>
								{property.price ? (<><i className="fas fa-dollar-sign"></i>{property.price}</>): null}
								{property.zipcode ? (<><i className="fas fa-map-marker-alt"></i>{property.zipcode}</>): null}
								{property.type ? (<><i className="fas fa-building"></i>{property.type}</>): null}
								{property.bedroom ? (<><i className="fas fa-bed"></i>{property.bedroom}</>): null}
								{property.bath ? (<><i className="fas fa-bath"></i>{property.bath}</>): null}
							</p>
						</div>) : null	
						}
                    <button type="button" onClick={handleDelete} data-property={property._id} className="btn btn-danger btn-sm btn-round btn-shadow btn-delete-property position-absolute">delete</button>
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
