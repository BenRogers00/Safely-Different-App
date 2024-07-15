//this file will compare an expected value to a value in the database and check if they match, this is done using strings
//example case: checking if a password is correct

import './App.css';
import { useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { useState } from 'react';
import { database } from './firebase/firebase';


//function will take in a string for a path, and an expected result to compare to
function useCheckValueInDB(path, expectedResult) {
    const [isExpected, setIsExpected] = useState(false);

    useEffect(() => {
        //make a reference to a location in the database
        const databaseRef = ref(database, path);
        
        //create a listener to look for changes made to the path
        const unsubscribe = onValue(databaseRef, (snapshot) => {
            //get data at that location
            const data = snapshot.val();
            //check if any data is stored
            if(data !== null && data !== "") {
                //if data is stored, compare to the expected result as a string
                const dataString = data.toString();
                setIsExpected(dataString === expectedResult);
            }        
        });

        //stop listening
        return () => unsubscribe();
    }, [path, expectedResult]); 

    //return the check, true if it is the expected value, false if not
    return isExpected;
}

export default useCheckValueInDB;