
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyB2uT3entYkePLTjc-6J1Gyp3dUj-3MRzg",
  authDomain: "summer-project-144f3.firebaseapp.com",
  projectId: "summer-project-144f3",
  storageBucket: "summer-project-144f3.firebasestorage.app",
  messagingSenderId: "381666784873",
  appId: "1:381666784873:web:709848882e774d962bd4f8",
  measurementId: "G-3DBYKESCD0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db, onAuthStateChanged}