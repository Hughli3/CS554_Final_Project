import React, { useContext } from "react";
import { Redirect } from "react-router";
import app from "./AuthBase.js";
import { AuthContext } from "./Auth.js";

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
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;