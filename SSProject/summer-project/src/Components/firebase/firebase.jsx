
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB78TadJ7iYeZMWa8bPjazbPOpD3I4Mc5Y",
  authDomain: "media-b69d0.firebaseapp.com",
  projectId: "media-b69d0",
  storageBucket: "media-b69d0.appspot.com",
  messagingSenderId: "82341034818",
  appId: "1:82341034818:web:fb668c9dfcb3ea6ec866db",
  measurementId: "G-2TT8EFVEMM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, onAuthStateChanged };