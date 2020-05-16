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
		// console.log(lastUpdate)
	}
	 
	useEffect(
		() => {
			async function getPropertyData() {
				try {
					setLoading(true);
                    const {data: property}  = await serverController.getProperty(props.match.params.id)
                    console.log(property);
					setPropertyData(property);
				} catch (e) {
					alert.error(e)
				}
			}
			async function checkWatchlist(currentUser) {
				try {
					const {data: watchlist}  = await serverController.getWatchlist(currentUser)
					console.log(watchlist.watchlist)
					if (watchlist.watchlist.includes(props.match.params.id)) {
						setIsWatchlist(true)
					} else {
						setIsWatchlist(false)
					}
					setLoading(false);
				} catch (e) {
					setLoading(false);
					alert.error(e)
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
			alert.error(e)
		}
	};

	const removeWatchlist = async () => {
		try {
			await serverController.removeWatchlist(propertyData._id, currentUser)
			setIsWatchlist(false)
			alert.success("successfully removed from waitlist")
		} catch (e) {
			alert.error(e)
		}
	};

    if (loading) {
        return (
            <div class="lds-facebook"><div></div><div></div><div></div></div>
        )
    }

	if (!propertyData) {
		return (
			<section class="section">
			<Helmet>
                <title>Property - RentSIT</title>
            </Helmet>
				<div class="container">
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
					<i class="fas fa-dollar-sign"></i>
					{propertyData.price}
				</>)
		}
		if (propertyData.zipcode) {
			zipcode = (
				<>
					<i class="fas fa-map-marker-alt"></i>
					{propertyData.zipcode}
				</>)
		}
		if (propertyData.type) {
			type = (
				<>
					<i class="fas fa-building"></i>
					{propertyData.type}
				</>)
		}
		if (propertyData.bedroom) {
			bed = (
				<>
					<i class="fas fa-bed"></i>
					{propertyData.bedroom}
				</>)
		}
		if (propertyData.bath) {
			bath = (
				<>
					<i class="fas fa-bath"></i>	
					{propertyData.bath}
				</>)
		}
		if (propertyData.owner._id && propertyData.owner.email) {
			owner = (
				<>
					<i class="fas fa-user"></i>
					<Link to={"/user/" + propertyData.owner._id}>{propertyData.owner.email}</Link>
				</>)
		}
		if (propertyData.owner.phone) {
			phone = (
				<>
					<i class="fas fa-phone"></i>
					{propertyData.owner.phone}
				</>)
		}

		return (
			<>
				{price || bed || bath? (
					<div class="icon-group">
						<p>{price} {bed} {bath}</p>
					</div>
					) : null
				}
				
				{zipcode || type ? (
					<div class="icon-group">
						<p>{zipcode}{type}</p>
					</div>
					) : null
				}
				<div class="icon-group">
					<p>{owner}</p>
				</div>
				{phone ? (
					<div class="icon-group">
						<p>{phone}</p>
					</div>
					) : null
				}
			</>
		)
	};

	const buildIndicator = (image, idx) => {
		return <li data-target="#carouselExampleIndicators" data-slide-to={idx} class={idx == 0 ? ("active") : ""}></li>
	}
	const carouselIndicator = propertyData.album.length == 0 ? 
			(<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>)
			: propertyData.album.map( (image, idx) => buildIndicator(image, idx))

	const buildCarouselImages = (image, idx) => {
		console.log(image)
		return (
			<div class={idx == 0 ? ("carousel-item active") : "carousel-item"}>
				<img class="d-block w-100" src={image} alt="property images"/>
			</div>
		)					
	}
	const carouselImages = propertyData.album.length == 0 ?
		<div class="carousel-item active">
			<img class="d-block w-100" src="/img/default_property.jpg" alt="property images"/>
		</div>
		 : propertyData.album.map( (image, idx) => buildCarouselImages(image, idx))

	return (
		<section class="section single-property">
			<Helmet>
                <title>{(propertyData && propertyData.title)} - RentSIT</title>
            </Helmet>
			<div class="container">
				{/* <h1 class="mb-5">All Property</h1> */}
				<h1 className='cap-first-letter'>{(propertyData && propertyData.title) || 'Not Provided'}</h1>
				<div class="icon-group">
					<p><i class="fas fa-clock"></i> Last Update {lastUpdate || 'Not Provided'}</p>
				
				</div>
				<div class="row">
					<div class='col-lg-7 col-12'>
						<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
							<ol class="carousel-indicators">
								{carouselIndicator}
							</ol>
							<div class="carousel-inner">
								{carouselImages}
							</div>
							<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
								<span class="carousel-control-prev-icon" aria-hidden="true"></span>
								<span class="sr-only">Previous</span>
							</a>
							<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
								<span class="carousel-control-next-icon" aria-hidden="true"></span>
								<span class="sr-only">Next</span>
							</a>
						</div>
					</div>
					<div class='col-lg-5 col-12 my-lg-0 my-4'>
						{constructDetail(propertyData)}
						{watchListButton}
					</div>
				</div>

				<div class='my-3 description'>
					<h2>Description</h2>
					<p>{(propertyData && propertyData.description) || 'Not Provided'}</p>
				</div>
			</div>
		</section>
	);
};

export default SingleProperty;
