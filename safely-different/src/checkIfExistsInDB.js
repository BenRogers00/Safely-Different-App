//this file checks if a value exists in a database, it contains a function that takes in a string that represents a path to somewhere in the database
//example case: see if a username exists in the database

import './App.css';
import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from './firebase/firebase';


//function to check if anything exists at the destination
function useCheckExistsInDB(path) {
    const [exists, setExists] = useState(false);
    console.log("useExist reach")
    useEffect(() => {
        const databaseRef = ref(database, path);
        //the following line sets up a 'listener' to check for any changes at the given path
        const unsubscribe = onValue(databaseRef, (snapshot) => {
            console.log("reaching")
            //store the data found at the path
            const data = snapshot.val();
            console.log("data:"+data)
            //if the data exists, this will be set to true, this is what will be returned
            setExists(data !== null);
        });

        //remove listener that was set up ealier
        return () => unsubscribe();
    }, [path]); //rerun if path changes

    //return the result of the function, false if data does not exist at the location, true if data does exist
    return exists;
}

export default useCheckExistsInDB;