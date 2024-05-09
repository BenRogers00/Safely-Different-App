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
const database =getDatabase();


function DisplayDatabase() {
  const [databaseContent, setDatabaseContent] = useState(null);

  console.log("DisplayDatabase called:")
  
  useEffect(() => {
    //get a 'snapshot' of the current state of the database
    const databaseRef = ref(database);
    //onValue is a firebase function that checks for any changes at a given location, in this case it is the entire database 
    onValue(databaseRef, (snapshot) => {
      //make a const for ease of use and reading
      const data = snapshot.val();
      //update the databaseContent variable
      setDatabaseContent(data);
    });
  }, []);

  //simple example of displaying database content
  return (
    <div className="App">
      <div className="Database-content">
        {/*if content is found, display it, if not found, display loading text*/}
        {databaseContent ? (
          <pre>{JSON.stringify(databaseContent, null, 2)}</pre>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default DisplayDatabase;
