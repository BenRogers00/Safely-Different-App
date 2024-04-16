//import React, { useState } from 'react';
import WriteToDatabase from './databaseWriting';
import TextField from './textFieldTest';

function WriteButton({value}) {
    const handleClick = () => {
        WriteToDatabase({dataInput: { value }})
    };

    return (
        <div>
            <button onClick={handleClick}>Write to database</button>
        </div>
    );
}

export default WriteButton;
