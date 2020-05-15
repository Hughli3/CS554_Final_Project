import React, {useEffect, useState, useContext} from 'react';
// import { AuthContext } from "../auth/Auth";
import serverController from "../serverController";
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom';

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
        <div>
            <h1 className='cap-first-letter'>User</h1>
            <p>User Id: {userData._id}</p>
            <p>User Avatar: {userData.avatar}</p>

            <p>email: {userData.email}</p>
            <p>phone: {userData.phone}</p>

            <ul>
                <h1>Property</h1>
                {li}
            </ul>
        </div>
        
    )
}