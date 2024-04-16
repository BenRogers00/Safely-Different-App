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
//const analytics = getAnalytics(app);
const database =getDatabase();


function WriteToDatabase() {
  console.log("writing called")
  //reference to a location in the database
  const databaseRef = ref(database, 'writingTest/tester')
  
  //data to add
  const newData = {
    data1: 'value1', //'data1' is the key, and 'value1' is the data
    data2: 'value2',
    data3: 'value3'
  };

  //put new data onto the database
  set(databaseRef, newData)
  //debugging info
  console.log("Data: ", newData, " has been added")
}

export default WriteToDatabase;
