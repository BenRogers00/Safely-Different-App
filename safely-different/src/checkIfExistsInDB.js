//this file checks if a value exists in a database, it contains a function that takes in a string that represents a path to somewhere in the database
//example case: see if a username exists in the database

import './App.css';
import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from 'firebase/database';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAdE_nE9Nk2RHU07QVdE582mqpip59Mgx4",
    authDomain: "safely-different.firebaseapp.com",
    projectId: "safely-different",
    storageBucket: "safely-different.appspot.com",
    messagingSenderId: "1039652889761",
    appId: "1:1039652889761:web:340c3733cef4bd24343ce0",
    measurementId: "G-ER3JKS4E2K",
    //added database URL for the location error
    databaseURL: "https://safely-different-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();

//function to check if anything exists at the destination
function useCheckExistsInDB(path) {
    const [exists, setExists] = useState(false);
    console.log("useExist reach")
    useEffect(() => {
        const databaseRef = ref(database, path);
        //the following line sets up a 'listener' to check for any changes at the given path
        const unsubscribe = onValue(databaseRef, (snapshot) => {
            console.log("reaching")
            //store the data found at the path
            const data = snapshot.val();
            console.log("data:"+data)
            //if the data exists, this will be set to true, this is what will be returned
            setExists(data !== null);
        });

        //remove listener that was set up ealier
        return () => unsubscribe();
    }, [path]); //rerun if path changes

    //return the result of the function, false if data does not exist at the location, true if data does exist
    return exists;
}

export default useCheckExistsInDB;