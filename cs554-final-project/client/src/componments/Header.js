import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from "./auth/Auth";
import { app } from "./auth/AuthBase"
// import PropertyList from './properties/PropertyList'
const Header = () => {

    const { currentUser } = useContext(AuthContext);

    return (
      <header>
        <nav id="navbar-main" className="navbar navbar-expand-lg navbar-dark bg-default">
          <div className="container">
            <Link className='navbar-brand mr-lg-5' to='/'>
                RentSIT
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar_global" aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbar_global">          
              <ul className="navbar-nav navbar-nav-hover align-items-center">
                <li key="home" className="nav-item">
                  <Link className='nav-link' to='/'>
                    <i className="fa fa-home mr-2"></i>
                    <span className="nav-link-inner--text">Home</span>
                  </Link>
                </li>
                <li key="property" className="nav-item dropdown">
                  <Link className='nav-link' to='/property'>
                    <i className="fa fa-building mr-2"></i>
                    <span className="nav-link-inner--text">Property</span>
                  </Link>
                </li>
              </ul>

              {currentUser ? (
                <ul className="navbar-nav align-items-center ml-lg-auto">
                    <li key="user" className="nav-item dropdown">
                      <Link className='nav-link' to='/account'>
                        <i className="fa fa-user mr-2"></i>
                        <span className="nav-link-inner--text">{currentUser.email}</span>
                      </Link>
                    </li>
                    <li key="logout" className="nav-item d-none d-lg-block ml-4">
                      <Link to="#" className="btn btn-secondary btn-icon" onClick={() => app.auth().signOut()}>
                        <span className="nav-link-inner--text">Logout</span>
                      </Link>
                    </li> 
                    <li key="logoutdropdown" className="nav-item dropdown d-lg-none">
                      <Link to="#" className="nav-link" onClick={() => app.auth().signOut()}>
                        <span className="nav-link-inner--text">Logout</span>
                      </Link>
                    </li> 
                </ul>
              ) : (
                <ul className="navbar-nav align-items-center ml-lg-auto">
                  <li key="login" className="nav-item d-none d-lg-block ml-4">
                    <Link className='btn btn-primary btn-icon' to='/login'>
                      <span className="nav-link-inner--text">Login</span>
                    </Link>
                  </li>
                  <li key="logindropdown" className="nav-item dropdown d-lg-none">
                    <Link className='nav-link' to='/login'>
                      <span className="nav-link-inner--text">Login</span>
                    </Link>
                  </li> 
                  <li key="signup" className="nav-item d-none d-lg-block ml-lg-4">
                    <Link className='btn btn-secondary btn-icon' to='/signup'>
                      <span className="nav-link-inner--text">Signup</span>
                    </Link>
                  </li>   
                  <li key="signupdropdown" className="nav-item dropdown d-lg-none">
                    <Link className='nav-link' to='/signup'>
                      <span className="nav-link-inner--text">Signup</span>
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </header>
    );
}

export default Header;