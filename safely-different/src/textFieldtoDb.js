import React, { useState } from 'react';
import WriteToDatabase from './databaseWriting';
import ReadOneDB from './readOneEntry';


function TextField() {
  //variable to store value of text field
  const [value, setValue] = useState('');
  
  //handle any changes made to text field
  const handleChange = (event) => {
    //update value on change
    setValue(event.target.value);
   // console.log(value)
    WriteToDatabase({ dataInput: event.target.value, path: "/textField" });

  };
 // console.log("Reading from textField: " + ReadOneDB('/textField'))

  return (
    <div>
      {/* text field input */}
      <textarea
        value={ReadOneDB('/textField')}
        onChange={handleChange}
        placeholder="input text"
      />
      {/* display value of text field */}
      <p>text field value: {value}</p>
      {/*<WriteButton value={value}/>*/}
      
    </div>
  );
}

export default TextField;
