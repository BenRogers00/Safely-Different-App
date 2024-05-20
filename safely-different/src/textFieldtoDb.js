import React, { useState } from 'react';
import WriteToDatabase from './databaseWriting';
import WriteButton from './databaseWritingButton';
import ReadOneDB from './readOneEntry';
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';


function TextField() {
  //variable to store value of text field
  const [value, setValue] = useState('');
  
  //handle any changes made to text field
  const handleChange = (event) => {
    //update value on change
    setValue(event.target.value);
    console.log(value)
    WriteToDatabase({ dataInput: event.target.value, path: "/textField" });

  };
  console.log("Reading from textField:" + ReadOneDB('/textField'))
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      document.getElementById('output').innerHTML = editorRef.current.getContent();
    }
  };

  return (
    <div>
      {/* text field input */}
      <textarea
        defaultValue={ReadOneDB('/textField')}
        onChange={handleChange}
        placeholder="input text"
      />
      <div id = "output">

      </div>
      {/* display value of text field */}
      <p>text field value: {value}</p>
      {/*<WriteButton value={value}/>*/}
      <Editor
        apiKey='by46301wfp914l08znnta78iu6169zud0lq4gc8y5whuwwp0'
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue={ReadOneDB('/textField')}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button onClick={log}>Log editor content</button>
    </div>



  );
}

export default TextField;
