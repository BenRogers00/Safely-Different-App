import React, { useState } from 'react';
import { database } from '../../firebase/firebase';
import { ref, get, push } from 'firebase/database';
import WriteToDatabase from '../../databaseWriting';

function CommentTextBox({ path }) {
    const [comment, setComment] = useState('');

    const handleInputChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = () => {
        const dataInput = comment.toString();

        const lengthCheckBranch = ref(database, path+"/comments");
        get(lengthCheckBranch).then((snapshot) => {
            const length = snapshot.size;
            const commentPath = path + "/comments/"+length;
            console.log(commentPath);
            console.log(`WriteToDatabase({dataInput: ${dataInput}, commentPath: ${commentPath}})`); 
            WriteToDatabase({dataInput, path: commentPath});
            console.log('Length of the branch:', length);
          }).catch((error) => {
            console.error('Error reading data:', error);
          });

        

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
