import React, { useState, useEffect } from 'react';
import { database } from '../../firebase/firebase';
import { ref, get } from 'firebase/database';
import WriteToDatabase from '../../databaseWriting';
import { ReturnEmail } from '../UsersDetails';

function CommentTextBox({ path }) {
    //set variables for email and comment data
    const [userEmail, setUserEmail] = useState('');
    const [comment, setComment] = useState('');
    //update comment data when comment is changed
    const handleInputChange = (event) => {
        setComment(event.target.value);
    };
    
    useEffect(() => {
        //get the email so it can be used to display who posted the comment
        ReturnEmail()
            .then((emailData) => {
                setUserEmail(emailData);
            })
            .catch((error) => {
                console.error("Error getting email: ", error);
            });
    }, []);

    const handleSubmit = () => {
        const dataInput = comment.toString();
        //make database reference to check how many sets of data are stored there
        const lengthCheckBranch = ref(database, path+"/comments");
        get(lengthCheckBranch).then((snapshot) => {
            //get length of branch and use as key for each comment
            const length = snapshot.size;
            const commentPath = path + "/comments/"+length;
            //write body of comment 
            WriteToDatabase({dataInput, path: commentPath+"/text"});
            //write user making comment
            WriteToDatabase({dataInput: userEmail, path: commentPath+"/user"});
          }).catch((error) => {
            console.error('Error reading data:', error);
          });
    };

    return (
        //style and display the comment text area
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
            {/*button to submit the comment */}
            <button onClick={handleSubmit} style={{backgroundColor: 'white'}}
            >Post Comment</button>
        </div>
    );
}

export default CommentTextBox;
