import React,{createContext, useState, useEffect} from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
export const AuthContext = createContext();



const AppContext = ({children}) => {

    const SignInWithGoogle = () =>{};

    const initialState={};

  return (
    <div>
      <AuthContext.Provider value={initialState}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}

export default AppContext
