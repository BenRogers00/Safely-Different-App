//this file will compare an expected value to a value in the database and check if they match, this is done using strings
//example case: checking if a password is correct

import './App.css';
import { useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from 'firebase/database';
import { useState } from 'react';

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

//function will take in a string for a path, and an expected result to compare to
function useCheckValueInDB(path, expectedResult) {
    const [isExpected, setIsExpected] = useState(false);

    useEffect(() => {
        //make a reference to a location in the database
        const databaseRef = ref(database, path);
        
        //create a listener to look for changes made to the path
        const unsubscribe = onValue(databaseRef, (snapshot) => {
            //get data at that location
            const data = snapshot.val();
            //check if any data is stored
            if(data !== null && data !== "") {
                //if data is stored, compare to the expected result as a string
                const dataString = data.toString();
                setIsExpected(dataString === expectedResult);
            }        
        });

        //stop listening
        return () => unsubscribe();
    }, [path, expectedResult]); 

    //return the check, true if it is the expected value, false if not
    return isExpected;
}

export default useCheckValueInDB;