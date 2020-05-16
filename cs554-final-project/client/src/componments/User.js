import React, {useEffect, useState, useContext} from 'react';
// import { AuthContext } from "../auth/Auth";
import serverController from "../serverController";
import { useAlert } from 'react-alert'
import Property from "./Property";
import { Link} from 'react-router-dom';
export default function User(props){
    
    const alert = useAlert();

    const [ userData, setUserData ] = useState({});
	const [ loading, setLoading ] = useState(true);

	useEffect( () => {
			async function fetchData() {
				try {
                    setLoading(true);
                    const {data: resData} = await serverController.getUserId(props.match.params.id);
					setUserData(resData);
                    setLoading(false);
				} catch (e) {
                    alert.error(e)
                    setLoading(false);
				}
			}
			fetchData();
		},
		[ props.match.params.id ]
    );
    
    let li = null;

    if (userData && userData.property && !(Array.isArray(userData.property) && userData.property.length)) {
        li = (
			<div className='show-body'>
				<p>No Property Under this user</p>
			</div>
        )
    } else {
        li = userData && userData.property && userData.property.map((property) => { 
            return (
                <>
                    <div class="row property-card my-3">
                        <div class="col-lg-6 col-md-4 col-6 pl-0">
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
                        <div class="col-lg-6 col-md-4 col-6 py-3">
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
                        </div>
                    </div>
                </>
            )
        });
    }
	
	
    if (loading) {
        return (
            <div class="lds-facebook"><div></div><div></div><div></div></div>
        )
    }

    return(
        <section class="section account">
            <div class="container">
                {/* <h1 className='mb-5'>Account</h1> */}
                <div className="row justify-content-center">
                    <div className="col-lg-3 col-md-4 col-6">
                        <div><h1 className='cap-first-letter'>User</h1></div>
                        <div class="avatar-container">
                            <img src="{{#if user.avatar}}{{user.avatar}}{{else}}./home/default_user.png{{/if}}" id="user-avatar" class="img-fluid avatar" alt="user avatar" />                
                        </div>
                        <div class="icon-group mt-4">
                        <p>User Id: {userData._id}</p>
                        </div>
                        
                        {userData.email ? (
					        <div class="icon-group mt-4">
                                <p>Email: {userData.email} 
                                </p>
                            </div>) : null}
                        {userData.phone ? (
                        <div class="icon-group my-3">
                            <p>Phone: {userData.phone}
                            </p>
                        </div>) : null}
                    </div>

                    <div className="col-lg-9 col-12 pl-4">
                    <h1 className='cap-first-letter'>Properties: </h1>
                    {li}
                    </div>
                </div>
            </div>
        </section>
    )
}