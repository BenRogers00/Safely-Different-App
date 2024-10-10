// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getDatabase } from "firebase/database";
// import { getStorage } from "firebase/storage";
// import { getFirestore } from "firebase/firestore";

// // Use environment variables directly in React
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize services
// const auth = getAuth(app);
// const database = getDatabase(app);
// const storage = getStorage(app);
// const db = getFirestore(app);

// console.log('API Key:', process.env.REACT_APP_FIREBASE_API_KEY);


// // Export the initialized services for use in other files
// export { auth, database, storage, db };
// export default app;

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdE_nE9Nk2RHU07QVdE582mqpip59Mgx4",
  authDomain: "safely-different.firebaseapp.com",
  databaseURL: "https://safely-different-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "safely-different",
  storageBucket: "safely-different.appspot.com",
  messagingSenderId: "1039652889761",
  appId: "1:1039652889761:web:340c3733cef4bd24343ce0",
  measurementId: "G-ER3JKS4E2K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);
const db = getFirestore(app);

console.log('API Key from .env:', process.env.REACT_APP_FIREBASE_API_KEY);

// Export the initialized services for use in other files
export { auth, database, storage,db };
export default app;