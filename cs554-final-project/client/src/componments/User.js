import React, {useEffect, useState, useContext} from 'react';
// import { AuthContext } from "../auth/Auth";
import serverController from "../serverController";
import { useAlert } from 'react-alert'
import { Link} from 'react-router-dom';
import { Helmet } from 'react-helmet';

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
                    setLoading(false);
                    alert.error(e.message)
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
                    <div className="row property-card mb-4">
                        <div className="col-lg-6 col-md-4 col-6 pl-0">
                            <Link to={'/property/' + property._id}>
                                {/* <div className="avatar-container"> */}
                                    {property.album.length == 0 ?
                                    (<img src="/img/default_property.jpg" className="card-img-left" alt="property image" />)
                                    :
                                    (<img src={property.album[0]} className="card-img-left" alt="property image" />)
                                    }
                                </Link>
                                {/* </div> */}
                        </div>
                        <div className="col-lg-6 col-md-4 col-6 py-3">
                            <Link to={'/property/' + property._id}>
                                <h1 className="display-4" className="title">{property.title}</h1>
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
            <div className="lds-facebook"><div></div><div></div><div></div></div>
        )
	}
	
	if (Object.keys(userData).length === 0) {
		return (
			<section className="section">
            <Helmet>
              <title> User  - RentSIT</title>
            </Helmet>
				<div className="container">
					<h1>404 - User Not Found!</h1>
				</div>
			</section>)	
	}

    return(
        <section className="section account">
            <Helmet>
              <title>{userData.email} - RentSIT</title>
            </Helmet>
            <div className="container">
                {/* <h1 className='mb-5'>Account</h1> */}
                <div className="row justify-content-center">
                    <div className="col-lg-3 col-md-4 col-6">
                        <div className="avatar-container">
							{userData.avatar ?
								<img src={userData.avatar} id="user-avatar" className="img-fluid avatar" alt="user avatar" />                
							: 	<img src="/img/default_user.png" id="user-avatar" className="img-fluid avatar" alt="user avatar" />                
							}
						</div>      
                        {userData.email ? (
					        <div className="icon-group mt-4">
								<p>
									<i className="fas fa-envelope"></i>{userData.email} 
                            	</p>
                            </div>) : null}
                        {userData.phone ? (
                        <div className="icon-group my-3">
							<p>
                                <i className="fas fa-phone"></i>{userData.phone}
                            </p>
                        </div>) : null}
                    </div>

                    <div className="col-lg-9 col-12 pl-4">
                    {li}
                    </div>
                </div>
            </div>
        </section>
    )
}