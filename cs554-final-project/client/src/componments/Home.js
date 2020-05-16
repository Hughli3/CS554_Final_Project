import React, { useState, useEffect } from "react";
import {BrowserRouter as Link} from "react-router-dom";
import { Helmet } from 'react-helmet'
import serverController from '../serverController';


const Home = () => {
    const [loading, setLoading] = useState(true);
    const [imgList, setImgList] = useState([]);


    useEffect(
		async () => {
			async function fetchData() {
				try {
					setLoading(true);
					const {data: resData} = await serverController.getSomeImages(4)
                    let il = await getImages(resData)
                    console.log(il);                    
					setLoading(false);
				} catch (e) {
					setLoading(false);
				}
			}
            fetchData();            
		},
		[]
    );

    const getImages = async (resData) => {
        let il = []
        for(let i=0; i<resData.data.length; i++) {
            const {data: imgData} = await serverController.getImage(resData.data[i])                        
            await il.push(imgData.data)
        }

        setImgList(prevState => {
            let array = il
            return array
        })
        return il
    }
    
    if (loading) {
        return (
            <div class="lds-facebook"><div></div><div></div><div></div></div>
        )
    }

    return (
        <>
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
                    <img src= "./home/1.jpg" className="img-fluid rounded" alt="an apartment photo" />
                    </div>
                </div>
            </div>
            </section>

            <section className="section section-md">
            <div className="container">
                <div className="row justify-content-center text-center mb-sm">
                <div className="col-lg-8">
                    <h1>Renting property</h1>
                </div>
                </div>
                <div className="row justify-content-center">
                {/* {{#each popularDogs}} */}
                <div className="col-6 col-md-3 mb-5 mb-lg-0">
                    <div className="px-4">
                    <a href="/property">
                        <div className="avatar-container">
                            <img src="{{avatar}}" className="img-fluid avatar" alt="property" />                
                        </div>
                        <div className="pt-3 text-center">
                        <h2 className="title">
                            {/* <span className="d-block mb-1">{{name}}</span> */}
                        </h2>
                        </div>
                    </a>
                    </div>
                </div>
                {/* {{/each}} */}
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
                <div className="col-md-4 d-none d-lg-block">
                    <img src="./home/2.jpg" className="img-fluid floating" alt="an apartment photo" />
                </div>
                </div>
            </div>
            </section>

            <section className="section">
            <div className="container">
                <div className="row row-grid align-items-center">
                <div className="col-12 col-lg-6">
                    <div className="card bg-default shadow border-0">
                    <img src="/public/img/brand/home-community.jpg" className="card-img-top" alt="a dog image" />
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
                    <a href="/property" className="font-weight-bold text-warning mt-5">see all properties renting</a>
                    </div>
                </div>
                </div>
            </div>
            </section>
            </>
  
    );
}

export default Home;