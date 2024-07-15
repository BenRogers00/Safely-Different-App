import React, { useState } from 'react';
import { database } from '../../firebase/firebase';
import { ref, push } from 'firebase/database';

function CommentTextBox({ path }) {
    const [comment, setComment] = useState('');

    const handleInputChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = () => {
        const dataInput = comment.toString();
        const commentPath = path + "/comments";
        console.log(commentPath);
        console.log(`WriteToDatabase({dataInput: ${dataInput}, commentPath: ${commentPath}})`); 
        const databaseRef = ref(database, commentPath);
        push(databaseRef, dataInput);

    };

    return (
        <div style={{color:'black'}}>
            <br/>
            <input
                type="textarea"
                value={comment}
                onChange={handleInputChange}
                placeholder="Enter your comment"
                style={{float:"left", marginLeft:'10%', padding:'5px'}}
            />
            <br/><br/>
            <button onClick={handleSubmit} style={{backgroundColor: 'white'}}
            >Post Comment</button>
        </div>
    );
}

export default CommentTextBox;
