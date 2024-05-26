import './App.css';
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from 'firebase/database';

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
console.log(app);
const database =getDatabase();


const WriteToDatabase = async ({ dataInput, path }) => {
  try {
    console.log("Writing called with:", dataInput);
    console.log("Data:", dataInput, "has been added to", path);
    //reference to a specified location in the database
    const databaseRef = ref(database, path);

    //set the data at the specified location
    await set(databaseRef, dataInput);

    //debugging success message
    console.log("Data:", dataInput, "has been added to", path);
  } catch (error) {
    //debugging for error checking
    console.error("Error adding data:", error);
  }
};

export default WriteToDatabase;
