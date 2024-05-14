import './App.css';
import { ref, set } from 'firebase/database';
import { database } from './firebase/firebase';



const WriteToDatabase = async ({ dataInput, path }) => {
  try {
    console.log("Writing called with:", dataInput);

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
