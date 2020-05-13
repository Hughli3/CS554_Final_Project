import React, { useContext } from "react";
import { Redirect } from "react-router";
import { AuthContext } from "./Auth.js";
import { app } from "./AuthBase";
import serverController from '../../serverController'
import ReactTooltip from "react-tooltip";
import { useAlert } from 'react-alert'

const SignUp = () => {
  const alert = useAlert()

  const handleSignUp = async (event) => {
    event.preventDefault();
    const { email, password, confirmPassword} = event.target.elements;
    try {
      if (password != confirmPassword) throw "different password"
      let signupInfo = await app.auth().createUserWithEmailAndPassword(email.value, password.value);
      serverController.postUser(signupInfo.user)
    } catch (error) {
      alert.error(error)
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
                <h1 className="text-center mb-4">Signup</h1>
                <form id="signup-form" onSubmit={handleSignUp}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className="input-group input-group-alternative mb-3" data-html="true" data-tip="length must be greatter than or equal to 6</br>letter and number only">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-user"></i></span>
                      </div>
                      <input className="form-control" placeholder="Email" id="email" name="email" type="text" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="input-group input-group-alternative" data-tip="length must be greater than or equal to 8">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-lock"></i></span>
                      </div>
                      <input className="form-control" placeholder="Password" id="password" name="password" type="password" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="input-group input-group-alternative" data-tip="must be same as the password you inputted">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-lock"></i></span>
                      </div>
                      <input className="form-control" placeholder="Reenter password" id="confirmPassword" name="confirmPassword" type="password" />
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary mt-4">Create account</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReactTooltip />
    </section>
  );
};

export default SignUp;