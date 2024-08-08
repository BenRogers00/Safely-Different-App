import React, { useState, useEffect } from 'react';
import { database } from '../../firebase/firebase';
import { ref, get } from 'firebase/database';
import WriteToDatabase from '../../databaseWriting';
import { ReturnEmail } from '../UsersDetails';


function CommentTextBox({ path }) {
    const [comment, setComment] = useState('');

    const handleInputChange = (event) => {
        setComment(event.target.value);
    };
    const [userEmail, setUserEmail] = useState('');
    useEffect(() => {
        console.log('useEffect called');
        ReturnEmail()
            .then((emailData) => {
                console.log('Email data:', emailData);
                setUserEmail(emailData);
            })
            .catch((error) => {
                console.error("Error getting email: ", error);
            });
    }, []);

    const handleSubmit = () => {
        const dataInput = comment.toString();

        const lengthCheckBranch = ref(database, path+"/comments");
        get(lengthCheckBranch).then((snapshot) => {
            //get length of branch and use as key for each comment
            const length = snapshot.size;
            const commentPath = path + "/comments/"+length;
            console.log(commentPath);
            console.log(`WriteToDatabase({dataInput: ${dataInput}, commentPath: ${commentPath}})`);
            //write body of comment 
            WriteToDatabase({dataInput, path: commentPath+"/text"});
            //write user making comment
            console.log("uemail: "+ userEmail);
            WriteToDatabase({dataInput: userEmail, path: commentPath+"/user"});
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
