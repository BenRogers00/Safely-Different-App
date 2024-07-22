// This is the AuthDetails component that will display the user's authentication details and allow them to sign out.

import React, { useEffect, useState, createContext, useContext } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const AuthContext = createContext({ authUser: null, signOut: () => {} });

export const useAuth = () => {
  return useContext(AuthContext);
};

// Set up the AuthDetails component to listen for changes in the user's authentication state.
const AuthDetails = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
      setLoading(false);
    });

    return () => {
      listen();
    };
  }, []);

  // Function to sign out the user
  const userSignOut = (callback) => {
    signOut(auth)
      .then(() => {
        console.log("Sign out successful.");
        setAuthUser(null);
        if (callback) callback();
      })
      .catch((error) => {
        console.log("Sign out error: ", error);
      });
  };

  // Display a loading message while the authentication state is being checked
  // This is useful for when the user is redirected to the sign-in page, otherwise it 
  // would display the sign-in page before the authentication state is checked.
  if (loading) {
    return <div>Loading...</div>;
  }

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={{ authUser, userSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthDetails;
