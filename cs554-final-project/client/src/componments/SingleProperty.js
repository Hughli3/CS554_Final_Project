import React, { useState, useEffect } from 'react';
import serverController from '../serverController'
// import noImage from '../img/noImg.jpeg';

const SingleProperty = (props) => {
	const [ propertyData, setPropertyData ] = useState();
	const [ loading, setLoading ] = useState(true);

	useEffect(
		() => {
			async function fetchData() {
				try {
					setLoading(true);
                    const {data: property}  = await serverController.getProperty(props.match.params.id)
                    console.log(property)
					setPropertyData(property);
					setLoading(false);
				} catch (e) {
					setLoading(false);
				}
			}
			fetchData();
		},
		[ props.match.params.id ]
	);

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

	return (
		<div className='show-body'>
			<h1 className='cap-first-letter'>{(propertyData && propertyData.title) || 'Not Provided'}</h1>

			<h2 className='cap-first-letter'>Basic:</h2>
			<dl>
				<dt>Id</dt><dd>{(propertyData && propertyData._id) || 'Not Provided'}</dd>
				<dt>Price</dt><dd>{(propertyData && propertyData.price) || 'Not Provided'}</dd>
				<dt>Address</dt><dd>{(propertyData && propertyData.address) || 'Not Provided'}</dd>
				<dt>area</dt><dd>{(propertyData && propertyData.area) || 'Not Provided'}</dd>
			</dl>
		</div>
	);
};

export default SingleProperty;
