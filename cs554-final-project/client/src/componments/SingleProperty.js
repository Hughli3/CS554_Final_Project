import React, { useState, useEffect, useContext } from 'react';
import serverController from '../serverController'
import { Link } from 'react-router-dom';
import { AuthContext } from "./auth/Auth";
import { useAlert } from 'react-alert'

const SingleProperty = (props) => {
	const [ propertyData, setPropertyData ] = useState();
	const [ isWatchlist, setIsWatchlist ] = useState();
	const [ loading, setLoading ] = useState(true);
	const { currentUser } = useContext(AuthContext);

	const alter = useAlert();

	useEffect(
		() => {
			async function getPropertyData() {
				try {
					setLoading(true);
                    const {data: property}  = await serverController.getProperty(props.match.params.id)
                    console.log(property);
					setPropertyData(property);
				} catch (e) {
					console.log(e)
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
					console.log(e)
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
			alter.success("successfully added to waitlist")
		} catch (e) {
			alter.error(e)
		}
	};

	const removeWatchlist = async () => {
		try {
			await serverController.removeWatchlist(propertyData._id, currentUser)
			setIsWatchlist(false)
			alter.success("successfully removed from waitlist")
		} catch (e) {
			alter.error(e)
		}
	};

	if (loading) {
		return (
			<div className='show-body'>
				<p>loading...</p>
			</div>
		)
	}

	if (!propertyData) {
		return (
			<div className='show-body'>
				<p>404 - Pokemon Not Found!</p>
			</div>
		)
	}

	let watchListButton = null
	if (currentUser) {
		watchListButton = isWatchlist ? (<button className="btn btn-secondary btn-icon" onClick={removeWatchlist}>Remove from Watchlist</button>) 
		: (<button className="btn btn-primary" onClick={addWatchlist}>Add To Watchlist</button>)
	}

	const constructDetail = (propertyData) => {
		let price, zipcode, type, bed, bath, owner;
		console.log(propertyData)
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
		if (propertyData.owner) {
			owner = (
				<>
					<i class="fas fa-user"></i>
					<Link to={"/user/" + propertyData.owner}>{propertyData.owner}</Link>
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
			</>
		)
	};

	return (
		<section class="section single-property">
			<div class="container">
				{/* <h1 class="mb-5">All Property</h1> */}
				<h1 className='cap-first-letter'>{(propertyData && propertyData.title) || 'Not Provided'}</h1>
				<div class="icon-group">
					<p><i class="fas fa-clock"></i> Last Update {(propertyData && propertyData.date) || 'Not Provided'}</p>
				
				</div>
				<div class="row">
					<div class='col-lg-7 col-12'>
						<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
							<ol class="carousel-indicators">
								<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
								<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
								<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
							</ol>
							<div class="carousel-inner">
								<div class="carousel-item active">
								<img class="d-block w-100" src="https://cdngeneral.rentcafe.com/dmslivecafe/3/509605/Avant-Apartments-Parking-Garage-Entrance-Carmel,-Indiana_WEB.jpg" alt="First slide"/>
								</div>
								<div class="carousel-item">
								<img class="d-block w-100" src="https://res.cloudinary.com/g5-assets-cld/image/upload/x_0,y_491,h_4413,w_7356,c_crop/q_auto,f_auto,fl_lossy,g_center,h_1200,w_2000/g5/g5-c-5g13txeqo-mark-taylor-companies-client/g5-cl-1j73ew2zby-the-core-scottsdale/uploads/DSC_7198-Edit-2_1_n06pxw.jpg" alt="Second slide" />
								</div>
								<div class="carousel-item">
								<img class="d-block w-100" src="https://www.aveliving.com/AVE/media/Property_Images/Florham%20Park/hero/flor-apt-living-(2)-hero.jpg?ext=.jpg" alt="Third slide" />
								</div>
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
