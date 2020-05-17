import React, { useState, useEffect, useRef } from 'react';
import serverController from '../serverController';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert'
import { Helmet } from 'react-helmet-async'

const Property = (props) => {

	const [ propertyData, setPropertyData ] = useState([]);
	const [ pageData, setPageData ] = useState({});
	const [ loading, setLoading ] = useState(true);
	const alert = useRef(useAlert());

	const urlParams = new URLSearchParams(props.location.search);
	let page = urlParams.get('page') || 1;
	let filter = urlParams.get('filter') || "null" ;
	let sort = urlParams.get('sort') || "null";
	let li = null;
	let pagination = null;

	useEffect(
		() => {
			async function fetchData() {
				try {
					setLoading(true);
                    const {data: resData} = await serverController.getAllProperty(page, filter, sort);
					setPropertyData(resData.properties);
					setPageData({next: resData.next, prev: resData.prev});
					setLoading(false);
				} catch (e) {
					alert.current.error(e.message)
					setLoading(false);
				}
			}
			fetchData();
		},
		[props.location.search, filter, page, sort]
	);

	li = propertyData && propertyData.map((property) => { 
		return (
			<>
			<Helmet>
                <title>Property - RentSIT</title>
            </Helmet>
				<div className="row property-card my-3">
					<div className="col-lg-6 col-md-4 col-6 pl-0">
						<Link to={'/property/' + property._id}>
							{property.album.length === 0 ?
							(<img src="/img/default_property.jpg" className="card-img-left" alt="property" />)
							:
							(<img src={property.album[0]} className="card-img-left" alt="property" />)
							}
						</Link>
					</div>
					<div className="col-lg-6 col-md-4 col-6 py-3">
						<Link to={'/property/' + property._id}>
							<h1 className="display-4 title">{property.title}</h1>
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
									{/* TODO add last update */}
								</p>
							</div>) : null	
							}												
					</div>
				</div>
			</>
		)
	});

	const buildPagination = (pageData) => {
		let prev = null
		let curr = null
		let next = null
		const currentPageNumber = parseInt(page)
		const prevPageNumber = currentPageNumber - 1
		const nextPageNumber = currentPageNumber + 1

		if (pageData.prev) {
			prev = (
				<li className="page-item">
					<Link to={"?page=" + prevPageNumber} className="page-link">
						<i className="fa fa-angle-left"></i>
						<span className="sr-only">Previous page</span>
					</Link>
				</li> )
		}

		if (pageData.next) {
			next = (
				<li className="page-item">
					<Link to={"?page=" + nextPageNumber} className="page-link">
						<i className="fa fa-angle-right"></i>
						<span className="sr-only">Next page</span>
					</Link>
				</li> )
		}

		if (pageData.next || pageData.prev) {
			curr = (
				<li className="page-item {{@active}}">
					<Link to={"?page=" + page} className="page-link" aria-label={"go to page " + currentPageNumber}>
						{currentPageNumber}
					</Link>
				</li>)
		}

		if (pageData.next || pageData.prev) {
			return (
				<nav>
					<ul className="pagination justify-content-center">
						{prev}
						{curr}
						{next}
					</ul>
				</nav>
			)
		}
	}

	if (pageData) {
		pagination = buildPagination(pageData)
	}

    if (loading) {
        return (
            <div className="lds-facebook"><div></div><div></div><div></div></div>
        )
    }

	if (!(Array.isArray(propertyData) && propertyData.length) && !(filter || sort)) {
		return (
			<section className="section">
				<div className="container">
					<h1>No Property!</h1>
				</div>
			</section>
		);
	}

	return (
	<main>
		<section className="section">
			<div className="container">
				<div className="row mb-5">	
					<div className="col-3 p-0">
						<div className="dropdown w-100 pr-2">
							<button className="btn btn-default dropdown-toggle w-100" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								filter Days on RentSIT
							</button>
							<div className="dropdown-menu w-100 pr-2" aria-labelledby="dropdownMenuButton">
							<Link to={"?page=" + page + "&filter=3days&sort=" + sort} className="dropdown-item">In 3 Days</Link>
							<Link to={"?page=" + page + "&filter=10days&sort=" + sort} className="dropdown-item">In 10 Days</Link>
							<Link to={"?page=" + page + "&filter=30days&sort=" + sort} className="dropdown-item">In 30 Days</Link>
							</div>
						</div>
					</div>

					<div className="col-3 p-0">
						<div className="dropdown w-100 pr-2">
							<button className="btn btn-default dropdown-toggle w-100" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								filter price
							</button>
							<div className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
							<Link to={"?page=" + page + "&filter=price1&sort=" + sort} className="dropdown-item">$ 0 - 1000</Link>
							<Link to={"?page=" + page + "&filter=price2&sort=" + sort} className="dropdown-item">$ 1000 - 2000</Link>
							<Link to={"?page=" + page + "&filter=price3&sort=" + sort} className="dropdown-item">$ 2000 +</Link>
							</div>
						</div>
					</div>

					<div className="col-3 p-0">
						<div className="dropdown w-100 pr-2">
							<button className="btn btn-primary dropdown-toggle w-100" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								sort price
							</button>
							<div className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
							<Link to={"?page=" + page + "&filter=" + filter + "&sort=priceUp"} className="dropdown-item">Low to High</Link>
							<Link to={"?page=" + page + "&filter=" + filter + "&sort=priceDown"} className="dropdown-item">High to Low</Link>
							</div>
						</div>
					</div>

					<div className="col-3 p-0">
							<Link  className="btn btn-secondary w-100" aria-haspopup="true" aria-expanded="false" to={"?page=" + page + "&filter=null&sort=null"} >Reset</Link>
					</div>
				</div>
				{li}
				{pagination}
			</div>
		</section>
	</main>
    );
};

export default Property;
