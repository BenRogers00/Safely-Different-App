import React, { useState, useRef, useContext, useReducer, useEffect } from "react";
import { AuthContext } from "../AppContext/AppContext";


const Profile = () => {
  const { user, userData } = useContext(AuthContext);
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
    <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
                    name="email"
                    type="email"
                    placeholder="Username"
                   
                />
                
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
                    name="password"
                    type="password"
                    placeholder="Password"
                   
                />
              
            </div>
            </div>
            </div>
            </div>
  )
}

export default Profile
