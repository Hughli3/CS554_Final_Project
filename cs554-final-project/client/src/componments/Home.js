import React, { useCallback, useContext } from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "./auth/Auth";
import app from "./auth/AuthBase"
import PropertyList from './properties/PropertyList'
import { Helmet } from 'react-helmet'

const TITLE = 'Home'

const Home = () => {

    const { currentUser } = useContext(AuthContext);

	// const [ loading, setLoading ] = useState(true);

    // if (loading) {
	// 	return (
	// 		<div className='show-body'>
	// 			<p>loading...</p>
	// 		</div>
	// 	)
	// }

    return (
        <>
<section class="section bg-default">
            <Helmet>
                <title>{ TITLE }</title>
            </Helmet>
  <div class="container d-flex">
      <div class="row">
        <div class="col-lg-6 py-sm">
          <h1 class="display-3  text-white">Rent A Place Easily<span>by using RentSIT</span></h1>
          <p class="lead text-white">Dog Dog helps you manage your dogs. we will records the health condition of your dogs and give professional advices to you.</p>
          <div class="btn-wrapper">
            <a href="/dog" class="btn btn-white btn-icon mb-3 mb-sm-0">
              <span class="btn-inner--icon"><i class="ni ni-cloud-download-95"></i></span>
              <span class="btn-inner--text">View all properties</span>
            </a>
          </div>
        </div>
        <div class="col-lg-6 d-none d-lg-block">
          <img src="/public/img/brand/home-header.jpg" class="img-fluid rounded" alt="a dog photo" />
        </div>
      </div>
  </div>
</section>

<section class="section section-md">
  <div class="container">
    <div class="row justify-content-center text-center mb-sm">
      <div class="col-lg-8">
        <h1>Cute Dogs</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      {/* {{#each popularDogs}} */}
      <div class="col-6 col-md-3 mb-5 mb-lg-0">
        <div class="px-4">
          <a href="/dog/">
            <div class="avatar-container">
                <img src="{{avatar}}" class="img-fluid avatar" alt="dog avatar" />                
            </div>
            <div class="pt-3 text-center">
              <h2 class="title">
                {/* <span class="d-block mb-1">{{name}}</span> */}
              </h2>
            </div>
          </a>
        </div>
      </div>
      {/* {{/each}} */}
    </div>
  </div>
</section>

<section class="section bg-secondary home-health-management-section">
  <div class="container">
    <div class="row row-grid align-items-center">
      <div class="col-12 col-lg-7">
        <div class="pr-md-5">
          <h1>Health Management</h1>
          <p class="lead">Dogdog provies cool features for you to help you manage 
             your dog's health easily. It is important to weigh your dog regularly and calculate your dog’s BMI.</p>
          <ul class="list-unstyled mt-5">
            <li class="py-2">
              <div class="d-flex align-items-center">
                <div>
                  <div class="badge badge-circle badge-success mr-3">
                    <i class="fas fa-weight"></i>
                  </div>
                </div>
                <div>
                  <h2 class="mb-0">Weight and Height traker</h2>
                </div>
              </div>
            </li>
            <li class="py-2">
              <div class="d-flex align-items-center">
                <div>
                  <div class="badge badge-circle badge-success mr-3">
                    <i class="fas fa-chart-line"></i>
                  </div>
                </div>
                <div>
                  <h2 class="mb-0">BMI chart</h2>
                </div>
              </div>
            </li>
            <li class="py-2">
              <div class="d-flex align-items-center">
                <div>
                  <div class="badge badge-circle badge-success mr-3">
                    <i class="fas fa-file-medical"></i>
                  </div>
                </div>
                <div>
                  <h2 class="mb-0">Health condition</h2>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-4 d-none d-lg-block">
        <img src="/public/img/brand/home-health.png" class="img-fluid floating" alt="a dog photo" />
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="row row-grid align-items-center">
      <div class="col-12 col-lg-6">
        <div class="card bg-default shadow border-0">
          <img src="/public/img/brand/home-community.jpg" class="card-img-top" alt="a dog image" />
          <blockquote class="card-blockquote">
            <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 583 95" class="svg-bg">
              <polygon points="0,52 583,95 0,95" class="fill-default" />
              <polygon points="0,42 583,95 683,0 0,95" opacity=".2" class="fill-default" />
            </svg>
            <h1 class="display-3 font-weight-bold text-white">Lovely Community</h1>
            <p class="lead text-italic text-white">Share your cute photos with other users. Build the lovely community together.</p>
          </blockquote>
        </div>
      </div>
      <div class="col-lg-6 d-none d-lg-block">
        <div class="pl-md-5">
          <div class="icon icon-lg icon-shape icon-shape-warning shadow rounded-circle mb-5">
            <i class="fas fa-comment"></i>
          </div>
          <h2>Comment on other dogs</h2>
          <p class="lead">Comment on other dogs in the community and build a friendly community together</p>
          <a href="/dog" class="font-weight-bold text-warning mt-5">see all dogs in the community</a>
        </div>
      </div>
    </div>
  </div>
</section>
</>
  
    );
}

export default Home;