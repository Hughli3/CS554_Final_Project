import React, { useState, useEffect } from 'react';
import serverController from '../serverController';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert'

const Property = (props) => {

	const [ propertyData, setPropertyData ] = useState([]);
	const [ pageData, setPageData ] = useState({});
	const [ loading, setLoading ] = useState(true);

	const alter = useAlert()
	const urlParams = new URLSearchParams(props.location.search);
	let page = urlParams.get('page') || 1;

	let li = null;
	let pagination = null;

	useEffect(
		() => {
			async function fetchData() {
				try {
					setLoading(true);
                    const {data: resData} = await serverController.getAllProperty(page);
					setPropertyData(resData.properties);
					setPageData({next: resData.next, prev: resData.prev});
					setLoading(false);
				} catch (e) {
					alter.error(e)
					setLoading(false);
				}
			}
			fetchData();
		},
		[props.location.search]
	);

	li = propertyData && propertyData.map((property) => { 
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

	const buildPagination = (pageData) => {
		let prev = null
		let curr = null
		let next = null
		const currentPageNumber = parseInt(page)
		const prevPageNumber = currentPageNumber - 1
		const nextPageNumber = currentPageNumber + 1

		if (pageData.prev) {
			prev = (
				<li class="page-item">
					<Link to={"?page=" + prevPageNumber} className="page-link">
						<i class="fa fa-angle-left"></i>
						<span class="sr-only ">Previous page</span>
					</Link>
				</li> )
		}

		if (pageData.next) {
			next = (
				<li class="page-item">
					<Link to={"?page=" + nextPageNumber} className="page-link">
						<i class="fa fa-angle-right"></i>
						<span class="sr-only">Next page</span>
					</Link>
				</li> )
		}

		if (pageData.next || pageData.prev) {
			curr = (
				<li class="page-item {{@active}}">
					<Link to={"?page=" + currentPageNumber} className="page-link" aria-label={"go to page " + currentPageNumber}>
						{currentPageNumber}
					</Link>
				</li>)
		}

		if (pageData.next || pageData.prev) {
			return (
				<nav>
					<ul class="pagination justify-content-center">
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
			<p>loading...</p>
		);
	}

	if (!(Array.isArray(propertyData) && propertyData.length)) {
		return (
			<section class="section">
				<div class="container">
					<h1>No Property!</h1>
				</div>
			</section>
		);
	}

	return (
		<section class="section">
			<div class="container">
				<h1 class="mb-5">All Property</h1>
				<div class="row">
					{li}
				</div>
				{pagination}
			</div>
		</section>
    );
};

export default Property;
