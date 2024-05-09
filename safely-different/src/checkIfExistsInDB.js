import './App.css';
import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
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
//const analytics = getAnalytics(app);
const database = getDatabase();


function useCheckExistsInDB(path) {
    const [exists, setExists] = useState(false);

    useEffect(() => {
        const databaseRef = ref(database, path);

        const unsubscribe = onValue(databaseRef, (snapshot) => {
            const data = snapshot.val();
            setExists(data !== null); // Update state based on whether data exists at the path
        });

        // Clean up subscription when component unmounts
        return () => unsubscribe();
    }, [path]); // Re-run effect if `path` changes

    return exists;
}

export default useCheckExistsInDB;