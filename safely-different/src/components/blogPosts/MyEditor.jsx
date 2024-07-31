import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from '../UI/HomepageComponents/NavBar';

function MyEditor() {
  const [value, setValue] = useState('');

  // Modules and formats should be defined inside the component or outside it
  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{ 'size': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean'] // removes formatting button
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];

  const handleEditorChange = (content) => {
    setValue(content);
    console.log('Editor content:', content); // This will print the content to the console for debugging
  };

  return (
    <div>
      <ReactQuill 
        theme="snow" 
        value={value} 
        onChange={handleEditorChange} 
        modules={modules} 
        formats={formats}
      />
    </div>
  );
}

export default MyEditor;
