import React, { useContext } from "react";
import { Redirect } from "react-router";
import { AuthContext } from "./Auth.js";
import app from "./AuthBase";

const SignUp = () => {

  const handleSignUp = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app.auth().createUserWithEmailAndPassword(email.value, password.value);
      // import axios from 'axios';
      // import server from '../../serverConfig'
      // const auth = await signupInfo.user.getIdToken(true)
      // await axios.post(server.baseUrl + "/api/user/", {uid: signupInfo.user.uid, auth: auth})
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