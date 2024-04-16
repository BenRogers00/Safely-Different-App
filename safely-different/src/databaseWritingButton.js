//import React, { useState } from 'react';
import WriteToDatabase from './databaseWriting';
import TextField from './textFieldtoDb';

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
