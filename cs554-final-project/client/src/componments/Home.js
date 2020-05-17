import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'
import serverController from '../serverController';


const Home = () => {
    const [loading, setLoading] = useState(true);
    const [propertyData, setPropertyData] = useState([]);

    useEffect(
		 () => {
			async function fetchData() {
				try {
					setLoading(true);
					const {data: resData} = await serverController.getAllProperty()
                    // TODO get property with album not empty
                    let filteredProperty = []
                    for(let i = 0; i < resData.properties.length && filteredProperty.length < 5; i++){                        
                        if (resData.properties[i].album && resData.properties[i].album.length > 0) {
                            filteredProperty.push(resData.properties[i]);
                        }
                    }
                    setPropertyData(filteredProperty)                   
                    setLoading(false);
				} catch (e) {
					setLoading(false);
				}
			}
            fetchData();            
		},
		[]
    );
    
    const buildSelectedProperty = (img, name, id) => {
        return (
        <div className="col-6 col-md-3 mb-5 mb-lg-0 home-selected-property">
            <div className="px-4">
            <Link to={"/property/" + id}>
                <div className="avatar-container">
                    <img src={img} className="img-fluid avatar" alt="property" />                
                </div>
                <div className="pt-3 text-center">
                <h2 className="title">{name ? name : "property"}</h2>
                </div>
            </Link>
            </div>
        </div>
    )}

    const buildSelectedProperties = (propertyData) => {
        let li = [];
        for (let i = 0; i < 4; i++) {
            if (i < propertyData.length) {
                li.push(buildSelectedProperty(propertyData[i].album[0], propertyData[i].title, propertyData[i]._id))
            } else {
                li.push(buildSelectedProperty("/img/default_property.jpg", null, ""))
            }
        }

		return (
		<>
            {li}
		</>
		);
    };

    const selectedProperties = buildSelectedProperties(propertyData)
    
    if (loading) {
        return (
            <div className="lds-facebook"><div></div><div></div><div></div></div>
        )
    }

    return (
        <main>
            <Helmet>
                <title>Home - RentSIT</title>
            </Helmet>
            <section className="section bg-default">

            <div className="container d-flex">
                <div className="row">
                    <div className="col-lg-6 py-sm">
                    <h1 className="display-3  text-white">Rent A Place Easily<span>by using RentSIT</span></h1>
                    <p className="lead text-white">RentSIT is a rental platform for Stevens students. This site allows property owners to post properties near Stevens for SIT students. Students can quickly browse all the properties and contact the owners.
                        </p>
                    <div className="btn-wrapper">
                        <Link to="/property" className="btn btn-white btn-icon mb-3 mb-sm-0">
                            <span className="btn-inner--icon"><i className="ni ni-cloud-download-95"></i></span>
                            <span className="btn-inner--text">View all properties</span>
                        </Link>
                    </div>
                    </div>
                    <div className="col-lg-6 d-none d-lg-block">
                    <img src= "./img/home/1.jpg" className="img-fluid rounded" alt="an apartment" />
                    </div>
                </div>
            </div>
            </section>

            <section className="section section-md">
            <div className="container">
                <div className="row justify-content-center text-center mb-sm">
                    <div className="col-lg-8">
                        <h1>Renting Property</h1>
                    </div>
                </div>
                <div className="row justify-content-center">
                    {selectedProperties}
                </div>
            </div>
            </section>

            <section className="section bg-secondary home-health-management-section">
            <div className="container">
                <div className="row row-grid align-items-center">
                <div className="col-12 col-lg-7">
                    <div className="pr-md-5">
                    <h1>Rent near Stevens Easily</h1>
                    <p className="lead">RentSIT provies cool features for you to help you quickly rent a house near Stevens Institute of Technology.</p>
                    <ul className="list-unstyled mt-5">
                        <li className="py-2">
                        <div className="d-flex align-items-center">
                            <div>
                            <div className="badge badge-circle badge-success mr-3">
                                <i className="fas fa-weight"></i>
                            </div>
                            </div>
                            <div>
                            <h2 className="mb-0">Filtered properties</h2>
                            </div>
                        </div>
                        </li>
                        <li className="py-2">
                        <div className="d-flex align-items-center">
                            <div>
                            <div className="badge badge-circle badge-success mr-3">
                                <i className="fas fa-chart-line"></i>
                            </div>
                            </div>
                            <div>
                            <h2 className="mb-0">Contact owner directly</h2>
                            </div>
                        </div>
                        </li>
                        <li className="py-2">
                        <div className="d-flex align-items-center">
                            <div>
                            <div className="badge badge-circle badge-success mr-3">
                                <i className="fas fa-file-medical"></i>
                            </div>
                            </div>
                            <div>
                            <h2 className="mb-0">Save to watchlist</h2>
                            </div>
                        </div>
                        </li>
                    </ul>
                    </div>
                </div>
                <div className="col-md-5 d-none d-lg-block">
                    <img src="./img/home/2.jpg" className="img-fluid floating" alt="an apartment" />
                </div>
                </div>
            </div>
            </section>

            <section className="section">
            <div className="container">
                <div className="row row-grid align-items-center">
                <div className="col-12 col-lg-6">
                    <div className="card bg-default shadow border-0">
                    <img src="./img/home/3.jpg" className="card-img-top" alt="community" />
                    <blockquote className="card-blockquote">
                        <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 583 95" className="svg-bg">
                        <polygon points="0,52 583,95 0,95" className="fill-default" />
                        <polygon points="0,42 583,95 683,0 0,95" opacity=".2" className="fill-default" />
                        </svg>
                        <h1 className="display-3 font-weight-bold text-white">Lovely Community</h1>
                        <p className="lead text-italic text-white">Share your valueable information with others. Build the lovely community together.</p>
                    </blockquote>
                    </div>
                </div>
                <div className="col-lg-6 d-none d-lg-block">
                    <div className="pl-md-5">
                    <div className="icon icon-lg icon-shape icon-shape-warning shadow rounded-circle mb-5">
                        <i className="fas fa-eye"></i>
                    </div>
                    <h2>Interested? Add to watchlist!</h2>
                    <p className="lead">Use watchlist to save rental information you are interested in. Quick comparison before making a decision</p>
                    <Link to="/property" className="font-weight-bold text-warning mt-5">see all properties renting</Link>
                    </div>
                </div>
                </div>
            </div>
            </section>
        </main>
    );
}

export default Home;