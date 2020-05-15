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

	// let img = null;
	// if (pokemonData && pokemonData.sprites && pokemonData.sprites.front_default) {
	// 	img = <img alt='pokemon' src={pokemonData.sprites.front_default} />;
	// } else {
	// 	img = <img alt='pokemon' src={noImage} />;
	// }

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
		watchListButton = isWatchlist ? (<button onClick={removeWatchlist}>Remove from Watchlist</button>) 
		: (<button onClick={addWatchlist}>Add To Watchlist</button>)
	}

	return (
		<div className='show-body'>
			<h1 className='cap-first-letter'>{(propertyData && propertyData.title) || 'Not Provided'}</h1>
			{watchListButton}
			<h2 className='cap-first-letter'>Basic:</h2>
			<dl>
				<dt>Id</dt><dd>{(propertyData && propertyData._id) || 'Not Provided'}</dd>
				<dt>Price</dt><dd>{(propertyData && propertyData.price) || 'Not Provided'}</dd>
				<dt>Description</dt><dd>{(propertyData && propertyData.description) || 'Not Provided'}</dd>
				<dt>area</dt><dd>{(propertyData && propertyData.area) || 'Not Provided'}</dd>
				<dt>Bedroom</dt><dd>{(propertyData && propertyData.bedroom) || 'Not Provided'}</dd>
				<dt>Bath</dt><dd>{(propertyData && propertyData.bath) || 'Not Provided'}</dd>
				<dt>Price</dt><dd>{(propertyData && propertyData.price) || 'Not Provided'}</dd>
				<dt>Zipcode</dt><dd>{(propertyData && propertyData.zipcode) || 'Not Provided'}</dd>
				
                <dt>owner</dt><dd>{(propertyData && propertyData.owner) || 'Not Provided'}</dd>
			</dl>
		</div>
	);
};

export default SingleProperty;
