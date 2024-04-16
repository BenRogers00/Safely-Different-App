import React, { useState } from 'react';
import WriteToDatabase from './databaseWriting';
import WriteButton from './databaseWritingButton';

function TextField() {
  //variable to store value of text field
  const [value, setValue] = useState('');

  //handle any changes made to text field
  const handleChange = (event) => {
    //update value on change
    setValue(event.target.value);
    console.log(value)
    WriteToDatabase({dataInput: value})
  };

  return (
    <div>
      {/* text field input */}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="input text"
      />
      {/* display value of text field */}
      <p>text field value: {value}</p>
      <WriteButton value={value}/>
    </div>
  );
}

export default TextField;
