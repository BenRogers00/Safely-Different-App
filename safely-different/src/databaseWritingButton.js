//import React, { useState } from 'react';
import WriteToDatabase from './databaseWriting';

function WriteButton() {
    const handleClick = () => {
        WriteToDatabase();
    };

    return (
        <div>
            <button onClick={handleClick}>Write to database</button>
        </div>
    );
}

export default WriteButton;
