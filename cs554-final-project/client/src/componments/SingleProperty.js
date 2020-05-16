import React, { useState, useEffect, useContext } from 'react';
import serverController from '../serverController'
import { Link } from 'react-router-dom';
import { AuthContext } from "./auth/Auth";
import { useAlert } from 'react-alert'
import { Helmet } from 'react-helmet'

const SingleProperty = (props) => {
	const [ propertyData, setPropertyData ] = useState();
	const [ isWatchlist, setIsWatchlist ] = useState();
	const [ loading, setLoading ] = useState(true);
	const { currentUser } = useContext(AuthContext);

	const alert = useAlert();
	let lastUpdate;
	if (propertyData && propertyData.date){
		let newDate = new Date();
		newDate.setTime(propertyData.date);
		lastUpdate = newDate.toLocaleString()
	}
	 
	useEffect(
		() => {
			async function getPropertyData() {
				try {
					setLoading(true);
                    const {data: property}  = await serverController.getProperty(props.match.params.id)
					setPropertyData(property);
					setLoading(false);
				} catch (e) {
					setLoading(false);
					alert.error(e.message)
				}
			}
			async function checkWatchlist(currentUser) {
				try {
					const {data: watchlist}  = await serverController.getWatchlist(currentUser)
					if (watchlist.watchlist.includes(props.match.params.id)) {
						setIsWatchlist(true)
					} else {
						setIsWatchlist(false)
					}
					setLoading(false);
				} catch (e) {
					setLoading(false);
					alert.error(e.message)
				}
			}

			getPropertyData();
			if (currentUser) {
				checkWatchlist(currentUser, propertyData)
			}
		},
		[ props.match.params.id ]
	);

	const addWatchlist = async () => {
		try {
			await serverController.addWatchlist(propertyData._id, currentUser)
			setIsWatchlist(true)
			alert.success("successfully added to waitlist")
		} catch (e) {
			alert.error(e.message)
		}
	};

	const removeWatchlist = async () => {
		try {
			await serverController.removeWatchlist(propertyData._id, currentUser)
			setIsWatchlist(false)
			alert.success("successfully removed from waitlist")
		} catch (e) {
			alert.error(e.message)
		}
	};

    if (loading) {
        return (
            <div className="lds-facebook"><div></div><div></div><div></div></div>
        )
    }

	if (!propertyData) {
		return (
			<section className="section">
			<Helmet>
                <title>Property - RentSIT</title>
            </Helmet>
				<div className="container">
					<h1>404 - Property Not Found!</h1>
				</div>
			</section>
		)
	}

	let watchListButton = null

	if (currentUser) {
		watchListButton = isWatchlist ? (<button className="btn btn-secondary btn-icon" onClick={removeWatchlist}>Remove from Watchlist</button>) 
		: (<button className="btn btn-primary" onClick={addWatchlist}>Add To Watchlist</button>)
	}

	const constructDetail = (propertyData) => {
		let price, zipcode, type, bed, bath, owner, phone;
		if (propertyData.price) {
			price = (
				<>
					<i className="fas fa-dollar-sign"></i>
					{propertyData.price}
				</>)
		}
		if (propertyData.zipcode) {
			zipcode = (
				<>
					<i className="fas fa-map-marker-alt"></i>
					{propertyData.zipcode}
				</>)
		}
		if (propertyData.type) {
			type = (
				<>
					<i className="fas fa-building"></i>
					{propertyData.type}
				</>)
		}
		if (propertyData.bedroom) {
			bed = (
				<>
					<i className="fas fa-bed"></i>
					{propertyData.bedroom}
				</>)
		}
		if (propertyData.bath) {
			bath = (
				<>
					<i className="fas fa-bath"></i>	
					{propertyData.bath}
				</>)
		}
		if (propertyData.owner._id && propertyData.owner.email) {
			owner = (
				<>
					<i className="fas fa-user"></i>
					<Link to={"/user/" + propertyData.owner._id}>{propertyData.owner.email}</Link>
				</>)
		}
		if (propertyData.owner.phone) {
			phone = (
				<>
					<i className="fas fa-phone"></i>
					{propertyData.owner.phone}
				</>)
		}

		return (
			<>
				{price || bed || bath? (
					<div className="icon-group">
						<p>{price} {bed} {bath}</p>
					</div>
					) : null
				}
				
				{zipcode || type ? (
					<div className="icon-group">
						<p>{zipcode}{type}</p>
					</div>
					) : null
				}
				<div className="icon-group">
					<p>{owner}</p>
				</div>
				{phone ? (
					<div className="icon-group">
						<p>{phone}</p>
					</div>
					) : null
				}
			</>
		)
	};

	const buildIndicator = (image, idx) => {
		return <li data-target="#carouselExampleIndicators" data-slide-to={idx} className={idx === 0 ? ("active") : ""}></li>
	}
	const carouselIndicator = propertyData.album.length === 0 ? 
			(<li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>)
			: propertyData.album.map( (image, idx) => buildIndicator(image, idx))

	const buildCarouselImages = (image, idx) => {
		return (
			<div className={idx === 0 ? ("carousel-item active") : "carousel-item"}>
				<img className="d-block w-100" src={image} alt="property images"/>
			</div>
		)					
	}
	const carouselImages = propertyData.album.length === 0 ?
		<div className="carousel-item active">
			<img className="d-block w-100" src="/img/default_property.jpg" alt="property images"/>
		</div>
		 : propertyData.album.map( (image, idx) => buildCarouselImages(image, idx))

	return (
		<section className="section single-property">
			<Helmet>
                <title>{(propertyData && propertyData.title)} - RentSIT</title>
            </Helmet>
			<div className="container">
				{/* <h1 className="mb-5">All Property</h1> */}
				<h1 className='cap-first-letter'>{(propertyData && propertyData.title) || 'Not Provided'}</h1>
				<div className="icon-group">
					<p><i className="fas fa-clock"></i> Last Update {lastUpdate || 'Not Provided'}</p>
				
				</div>
				<div className="row">
					<div className='col-lg-7 col-12'>
						<div id="carouselIndicators" className="carousel slide" data-ride="carousel">
							<ol className="carousel-indicators">
								{carouselIndicator}
							</ol>
							<div className="carousel-inner">
								{carouselImages}
							</div>
							<a className="carousel-control-prev" href="#carouselIndicators" role="button" data-slide="prev">
								<span className="carousel-control-prev-icon" aria-hidden="true"></span>
								<span className="sr-only">Previous</span>
							</a>
							<a className="carousel-control-next" href="#carouselIndicators" role="button" data-slide="next">
								<span className="carousel-control-next-icon" aria-hidden="true"></span>
								<span className="sr-only">Next</span>
							</a>
						</div>
					</div>
					<div className='col-lg-5 col-12 my-lg-0 my-4'>
						{constructDetail(propertyData)}
						{watchListButton}
					</div>
				</div>

				<div className='my-3 description'>
					<h2>Description</h2>
					<p>{(propertyData && propertyData.description) || 'Not Provided'}</p>
				</div>
			</div>
		</section>
	);
};

export default SingleProperty;
