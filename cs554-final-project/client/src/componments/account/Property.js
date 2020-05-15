import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../auth/Auth";
import serverController from '../../serverController';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert'

const Property = (props) => {
	const { currentUser } = useContext(AuthContext);
	const [ propertyData, setPropertyData ] = useState([]);
	const [ loading, setLoading ] = useState(true);

	const alert = useAlert();

	useEffect(
		() => {
			async function fetchData() {
				try {
					setLoading(true);
					// if (!props.match.params.page.match(/^\d+$/)) throw Error("invalid page id");
					// const offset = parseInt(props.match.params.page) * 20;
					const {data: resData} = await serverController.getUser(currentUser);
					console.log(resData)
					setPropertyData(resData.property);
					setLoading(false);
				} catch (e) {
					setLoading(false);
				}
			}
			fetchData();
		},
		[]
	);

	const handleDelete = async (event) => {
		event.preventDefault();
		let propertyId = event.target.getAttribute('data-property')
		try {
			await serverController.deleteProperty(propertyId, currentUser)
			const {data: resData} = await serverController.getUser(currentUser);
			setPropertyData(resData.property);
			alert.success('deleted')
		} catch (e) {
			alert.error(e)
		}
	};

	let li = null;
	
	const buildListItem = (property) => {
		const propertyId = property._id
		return (
		<>
			<div class="row property-card mb-4">
				<div class="col-lg-6 col-6 pl-0">
					<Link to={'/property/' + property._id}>
						{/* <div class="avatar-container"> */}
							{property.avatar ?
							(<img src="https://cdngeneral.rentcafe.com/dmslivecafe/3/509605/Avant-Apartments-Parking-Garage-Entrance-Carmel,-Indiana_WEB.jpg" class="card-img-left" alt="property image" />)
							:
							(<img src="https://cdngeneral.rentcafe.com/dmslivecafe/3/509605/Avant-Apartments-Parking-Garage-Entrance-Carmel,-Indiana_WEB.jpg" class="card-img-left" alt="property image" />)
							}
						</Link>
						{/* </div> */}
				</div>
				<div class="col-lg-6 col-6 py-3">
					<Link to={'/property/' + property._id}>

						<h1 class="display-4" class="title">{property.title}</h1>
						</Link>
						{property.description ? (<p class="description">{property.description}</p>) : null}
					
						{ property.price || property.zipcode || property.type || property.bedroom || property.bath ?
						(<div class="icon-group">
							<p>
								{property.price ? (<><i class="fas fa-dollar-sign"></i>{property.price}</>): null}
								{property.zipcode ? (<><i class="fas fa-map-marker-alt"></i>{property.zipcode}</>): null}
								{property.type ? (<><i class="fas fa-building"></i>{property.type}</>): null}
								{property.bedroom ? (<><i class="fas fa-bed"></i>{property.bedroom}</>): null}
								{property.bath ? (<><i class="fas fa-bath"></i>{property.bath}</>): null}
							</p>
						</div>) : null	
						}
						<Link to={"/account/property/" + property._id} class="btn btn-primary btn-sm btn-round btn-shadow btn-edit-property position-absolute">edit</Link>
						<button type="button" onClick={handleDelete} data-property={property._id} class="btn btn-danger btn-sm btn-round btn-shadow btn-delete-property position-absolute">delete</button>
				</div>
			</div>
		</>
		);
	};

	li = propertyData &&
        propertyData.map((property) => {
			return buildListItem(property);
		 });
	

	if (loading) {
		return (
			<div class="lds-facebook"><div></div><div></div><div></div></div>
		)
	}

	return (
		<>
			<div class="row property-card property-add mb-3">
				<Link class="align-self-center d-flex align-items-center justify-content-center" to='/account/property/add'>
					<div>
						<p><i class="fas fa-plus"></i></p>
						<p>Post Property</p>
					</div>
				</Link>
			</div>
			{li}
		</>
    );
    
};

export default Property;
