// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2uT3entYkePLTjc-6J1Gyp3dUj-3MRzg",
  authDomain: "summer-project-144f3.firebaseapp.com",
  projectId: "summer-project-144f3",
  storageBucket: "summer-project-144f3.firebasestorage.app",
  messagingSenderId: "381666784873",
  appId: "1:381666784873:web:709848882e774d962bd4f8",
  measurementId: "G-3DBYKESCD0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);