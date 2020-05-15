import React, { useEffect, useState } from "react";
import { app } from "./AuthBase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    });
  }, []);

  if(loading){
    return (
			<div class="lds-facebook"><div></div><div></div><div></div></div>)
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};