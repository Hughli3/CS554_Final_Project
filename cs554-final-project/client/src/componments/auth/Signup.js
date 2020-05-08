import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "./Auth.js";
import app from "./AuthBase";
import user from "../../data/user";

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async (event, currentUser) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      let signupInfo = await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
      
      user.addUser(signupInfo.user.uid, signupInfo.user.email)
      // TODO init user in db
      
    } catch (error) {
      alert(error);
    }

  }, [history]);

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

export default withRouter(SignUp);