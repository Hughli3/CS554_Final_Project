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
    
    // build card
	const buildListItem = (property) => {
		const propertyId = property._id
		return (
			<li key={propertyId}>
				    <Link to={`/property/${propertyId}`}>{property.title}</Link>
			</li>
		);
	};

    if (userData && userData.property && !(Array.isArray(userData.property) && userData.property.length)) {
        li = (
			<div className='show-body'>
				<p>No Property Under this user</p>
			</div>
        )
    } else {
        li = userData && userData.property && userData.property.map((property) => {
            return buildListItem(property);
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
                        <div class="icon-group mt-4">property: {li}</div>
                    </div>
                </div>
            </div>
        </section>
    )
}