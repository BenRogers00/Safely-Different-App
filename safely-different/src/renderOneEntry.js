import './App.css';
import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from './firebase/firebase';

function ReadOneDB(path) {
    const [databaseContent, setDatabaseContent] = useState(null);
    useEffect(() => {
        //get a 'snapshot' of the current state of the database
        const databaseRef = ref(database, path);

        //check for any changes at a given location, in this case it is a specific field 
        onValue(databaseRef, (snapshot) => {
            //make a const for ease of use and reading
            const data = snapshot.val();
            //update the databaseContent variable
            setDatabaseContent(data);
        });
    }, [path]);

    //simple example of displaying database content
    return databaseContent;
}

export default ReadOneDB;
