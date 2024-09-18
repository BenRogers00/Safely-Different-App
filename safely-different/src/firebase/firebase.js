import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
import { getStorage } from "firebase/storage";

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
const storage = getStorage(appapp);

// Export the initialized services for use in other files
export { auth, database, storage };
export default app;