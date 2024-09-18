import "./App.css";
import React, { useState, useEffect } from "react";
import { database } from "./firebase/firebase";
import { ref, onValue } from "firebase/database";

function DisplayDatabase() {
  const [databaseContent, setDatabaseContent] = useState(null);

  console.log("DisplayDatabase called:");

  useEffect(() => {
    //get a 'snapshot' of the current state of the database
    const databaseRef = ref(database);
    //onValue is a firebase function that checks for any changes at a given location, in this case it is the entire database
    onValue(databaseRef, (snapshot) => {
      //make a const for ease of use and reading
      const data = snapshot.val();
      //update the databaseContent variable
      setDatabaseContent(data);
    });
  }, []);

  //simple example of displaying database content
  return (
    <div className="App">
      <div className="Database-content">
        {/*if content is found, display it, if not found, display loading text*/}
        {databaseContent ? (
          <pre>{JSON.stringify(databaseContent, null, 2)}</pre>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default DisplayDatabase;
