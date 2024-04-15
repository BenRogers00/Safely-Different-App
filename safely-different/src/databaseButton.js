import React, { useState } from 'react';
import DisplayDatabase from './databaseDisplay';

function DatabaseButton() {
    //state variable to set if database should be displayed
    const [showDatabase, setShowDatabase] = useState(false);

    const handleClick = () => {
        //setShowDatabase to true on click
        setShowDatabase(true);
    };
  
    return (
        <div>
            {/*render the displayDatabase component depending on the state of showDatabase */}
            {showDatabase && <DisplayDatabase />}
            <button onClick={handleClick}>Click me!</button>
        </div>
    );
}

export default DatabaseButton;
