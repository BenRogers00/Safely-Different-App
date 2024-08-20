import React, { useState, useEffect } from 'react';
import { database } from '../../firebase/firebase';
import { ref, get } from 'firebase/database';
import WriteToDatabase from '../../databaseWriting';
import { ReturnEmail } from '../UsersDetails';

function CommentTextBox({ path, imageUrl, toggleCommentBox, postId }) {
    const [userEmail, setUserEmail] = useState('');
    const [comment, setComment] = useState('');

    const handleInputChange = (event) => {
        setComment(event.target.value);
    };

    useEffect(() => {
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
        const lengthCheckBranch = ref(database, path + "/comments");
        get(lengthCheckBranch).then((snapshot) => {
            const length = snapshot.size;
            const commentPath = path + "/comments/" + length;
            WriteToDatabase({ dataInput, path: commentPath + "/text" });
            WriteToDatabase({ dataInput: userEmail, path: commentPath + "/user" });
            if (imageUrl) {
                WriteToDatabase({ dataInput: imageUrl, path: commentPath + "/image" });
            }
        }).catch((error) => {
            console.error('Error reading data:', error);
        });

        if (toggleCommentBox) {
            toggleCommentBox();
        }
    };

    return (
        <div>
            <div style={{color:'black'}} id='commentTextArea'>
                <br/>
                {/* Display drawing miniature if available */}
                {imageUrl && (
                    <div style={{ margin: '10px', border: '1px solid #ccc', display: 'inline-block' }}>
                        <img src={imageUrl} alt="Miniature drawing" style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
                    </div>
                )}
                <input
                    type="textarea"
                    value={comment}
                    onChange={handleInputChange}
                    placeholder="Enter your comment"
                    style={{float:"left", marginLeft:'10%', padding:'5px'}}
                />
                <br/><br/>
            </div>
            <button id="postComment" onClick={handleSubmit}>Post Comment</button>
        </div>
    );
}

export default CommentTextBox;
