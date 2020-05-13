import React, { useContext } from "react";
import { Redirect } from "react-router";
import { app, googleProvider } from "./AuthBase.js";
import { AuthContext } from "./Auth.js";
import ReactTooltip from "react-tooltip";

const Login = () => {
  const handleLogin = 
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app.auth().signInWithEmailAndPassword(email.value, password.value);
      } catch (error) {
        alert(error);
      }
    };

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/account" />;
  }
  
  return (
    <section className="section bg-default signup-login-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="card bg-secondary shadow border-0">
              <div className="card-body px-lg-5 py-lg-5">
                <h1 className="text-center mb-4">Login</h1>
                <form id="login-form" onSubmit={handleLogin}>
                  <div className="form-group">
                      <label htmlFor="username">Email</label>
                      <div className="input-group input-group-alternative" data-tip="username is case-insensitive">
                        <div className="input-group-prepend">
                          <span className="input-group-text"><i className="fa fa-user"></i></span>
                        </div>
                        <input className="form-control"  type="email"  placeholder="Email" name="email" id="email" />
                      </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="input-group input-group-alternative">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-lock"></i></span>
                      </div>
                      <input className="form-control" placeholder="Password" type="password" name="password" id="password" />
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary my-4">Login</button>
                  </div>
                </form>
                <div className="text-center">
                  <button className="btn btn-primary btn-icon" onClick={() => app.auth().signInWithPopup(googleProvider)}>Login as Google</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReactTooltip />
    </section>
  );
};

export default Login;