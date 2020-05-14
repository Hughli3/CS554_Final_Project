import React, { useState, useEffect } from 'react';
import serverController from '../serverController';
import { Link } from 'react-router-dom';

const Property = (props) => {
	const [ propertyData, setPropertyData ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	let li = null;

	useEffect(
		() => {
			async function fetchData() {
				try {
					setLoading(true);
					// if (!props.match.params.page.match(/^\d+$/)) throw Error("invalid page id");
					// const offset = parseInt(props.match.params.page) * 20;
                    const {data: resData} = await serverController.getAllProperty(props.match.params.take, props.match.params.skip);
					setPropertyData(resData);
					setLoading(false);
				} catch (e) {
					setLoading(false);
				}
			}
			fetchData();
		},
		[ props.match.params.take, props.match.params.skip ]
	);

	const buildListItem = (property) => {
		const propertyId = property._id
		return (
			<li key={propertyId}>
				<Link to={`/property/${propertyId}`}>
					{property.title}
				</Link>
			</li>
		);
	};

	li = propertyData &&
        propertyData.map((property) => { 
			return (
				<div class="col-lg-3 col-md-4 col-6 mb-4">
					<div class="card">
						<Link to={'/property/' + property._id}>
							<div class="avatar-container">
								{property.avatar ?
								(<img src="{{ avatar }}" class="card-img-top" alt="dog avatar" />)
								:
								(<img src="/public/img/avatar/default-dog.png" class="card-img-top" alt="dog avatar" />)
								}
							</div>
							<div class="card-body">
								<h2 class="display-4">{property.title}</h2>
								<p class="card-text"><span class="card-text-gender">{property.price}</span> {property.area}</p>
							</div>
						</Link>
					</div>
				</div>    
			)
		});
	
	// let preLink = linkData.preLink ? (<Link className='pre-link' to={(parseInt(props.match.params.page) - 1).toString()}> Previous </Link>) : "";
	// let nextLink = linkData.nextLink ? (<Link className='next-link' to={(parseInt(props.match.params.page) + 1).toString()}> Next </Link>) : "";
		
	if (loading) {
		return (
			// <div className='show-body'>
				<p>loading...</p>
			// </div>
		);
	}

	if (!(Array.isArray(propertyData) && propertyData.length)) {
		return (
			<div className='show-body'>
				<p>404 - Property List Not Found!</p>
			</div>
		);
	}

	return (
		<section class="section">
			<div class="container">
				<h1 class="mb-5">All Property</h1>
				<div class="row">
					{li}
				</div>
				<nav>
					<ul class="pagination justify-content-center">
					<li class="page-item">
						<a class="page-link" href="?page={{@previousPage}}">
						<i class="fa fa-angle-left"></i>
						<span class="sr-only ">Previous page</span>
						</a>
					</li>

					<li class="page-item {{@active}}"><a class="page-link" href="?page={{@page}}" aria-label="go to page {{@page}}"></a></li>

					<li class="page-item">
						<a class="page-link" href="?page={{@nextPage}}">
						<i class="fa fa-angle-right"></i>
						<span class="sr-only">Next page</span>
						</a>
					</li>
					</ul>
				</nav>
			</div>
		</section>
    );
};

export default Property;
