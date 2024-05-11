// This is the AuthDetails component that will display the user's authentication details and allow them to sign out.

import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {authUser ? (
        //if user is signed in, offer sign out button, and show sign in status 
        <>
          <p>{`Signed In as ${authUser.email}`}</p>
          <button onClick={userSignOut}>Sign Out</button>
        </>
      ) : (
        //if user is not signed in, offer sign in / sign up options
        <>
        <SignUp/>
        <SignIn/>
        <p>Signed Out</p>
        </>
      )}
    </div>
  );
};

export default AuthDetails;