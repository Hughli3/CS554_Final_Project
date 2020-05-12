import React, { useContext } from "react";
import { Redirect } from "react-router";
import { AuthContext } from "./Auth.js";
import { app } from "./AuthBase";
import serverController from '../../serverController'

const SignUp = () => {

  const handleSignUp = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      let signupInfo = await app.auth().createUserWithEmailAndPassword(email.value, password.value);
      serverController.postUser(signupInfo.user)

    } catch (error) {
      alert(error);
    }
  };

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/account" />;
  }

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;