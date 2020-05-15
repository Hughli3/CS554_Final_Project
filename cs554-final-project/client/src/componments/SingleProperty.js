import React, { useState, useEffect, useContext } from 'react';
import serverController from '../serverController'
import { Link } from 'react-router-dom';
import { AuthContext } from "./auth/Auth";
// import noImage from '../img/noImg.jpeg';

const SingleProperty = (props) => {
	const [ propertyData, setPropertyData ] = useState();
	const [ isWatchlist, setIsWatchlist ] = useState();
	const [ loading, setLoading ] = useState(true);
	const { currentUser } = useContext(AuthContext);

	useEffect(
		() => {
			async function getPropertyData() {
				try {
					setLoading(true);
                    const {data: property}  = await serverController.getProperty(props.match.params.id)
                    console.log(property)
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
		} catch (error) {
			console.log(error);
		}
	};

	const removeWatchlist = async () => {
		try {
			await serverController.removeWatchlist(propertyData._id, currentUser)
			setIsWatchlist(false)
		} catch (error) {
			console.log(error);
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
		let price, zipcode, type, bedbath, area, owner;
		console.log(propertyData)
		if (propertyData.price) {
			price = (
				<p>
					<i class="fas fa-dollar-sign"></i>
					Price {propertyData.price}
				</p>)
		}
		if (propertyData.zipcode) {
			zipcode = (
				<p>
					<i class="fas fa-map-marker-alt"></i>
					zipcode {propertyData.zipcode}
				</p>)
		}
		if (propertyData.type) {
			type = (
				<p>
					<i class="fas fa-building"></i>
					Type {propertyData.type}
				</p>)
		}
		if (propertyData.bedroom && propertyData.bath) {
			bedbath = (
				<p>
					<i class="fas fa-bed"></i>
					Bedroom {propertyData.bedroom} 
					<i class="fas fa-bath"></i>	
					Bath {propertyData.bath}
				</p>)
		}
		if (propertyData.area) {
			area = (
				<p>
					<i class="fas fa-ruler-combined"></i>
					Area {propertyData.area}
				</p>)
		}
		if (propertyData.owner) {
			owner = (
				<p>
					<i class="fas fa-user"></i>
					Owner <Link to={"/user/" + propertyData.owner}>{propertyData.owner}</Link>
				</p>)
		}

		return (
			<>
				{price}
				{zipcode}
				{type}
				{bedbath}
				{area}
				{owner}
			</>
		)
	};

	return (
		<section class="section">
			<div class="container">
				{/* <h1 class="mb-5">All Property</h1> */}
				<h1 className='cap-first-letter'>{(propertyData && propertyData.title) || 'Not Provided'}</h1>
				<p><i class="fas fa-clock"></i>last update: {(propertyData && propertyData.date) || 'Not Provided'}</p>

				<div class="row">
					<div class='col-7'>
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
					<div class='col-5'>
						{constructDetail(propertyData)}
						{watchListButton}
					</div>
				</div>

				<div>
					<h2>Description</h2>
					<p>{(propertyData && propertyData.description) || 'Not Provided'}</p>
				</div>
			</div>
		</section>
	);
};

export default SingleProperty;
