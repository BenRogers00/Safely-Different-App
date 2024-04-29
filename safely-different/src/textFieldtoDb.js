import React, { useState } from 'react';
import WriteToDatabase from './databaseWriting';
import WriteButton from './databaseWritingButton';
import ReadOneDB from './readOneEntry';


function TextField() {
  //variable to store value of text field
  const [value, setValue] = useState('');
  
  //handle any changes made to text field
  const handleChange = (event) => {
    //update value on change
    setValue(event.target.value);
    console.log(value)
    WriteToDatabase({dataInput: event.target.value})
  };



  console.log("defaultValue={", ReadOneDB('writingTest/textFieldTest1/textFieldTest2'))

  return (
    <div>
      {/* text field input */}
      <textarea
      id="expandingTextField"
        defaultValue={ReadOneDB('writingTest/textFieldTest1/textFieldTest2')}
        onChange={handleChange}
        placeholder="input text"
      />
      <script src="textFieldExpandingScript.js"/>
      {/* display value of text field */}
      <p>text field value: {value}</p>
      <WriteButton value={value}/>
    </div>
  );
}

export default TextField;
