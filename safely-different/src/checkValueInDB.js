import './App.css';
import { useEffect } from 'react';
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
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
//const analytics = getAnalytics(app);
const database = getDatabase();

function useCheckValueInDB(path, expectedResult) {
    const [isExpected, setIsExpected] = useState(false);
    
    useEffect(() => {
        const databaseRef = ref(database, path);
        
        const unsubscribe = onValue(databaseRef, (snapshot) => {
            const data = snapshot.val();
            const dataString = data.toString();
            setIsExpected(dataString === expectedResult);
        });

        return () => unsubscribe();
    }, [path, expectedResult]); 
    return isExpected;
}

export default useCheckValueInDB;