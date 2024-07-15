import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebase/firebase';
import ReadOneDB from '../../readOneEntry';

function CommentDisplay({ postId }) {
    const [commentHTML, setCommentHTML] = useState("<h2>Comments: </h2>");

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const commentRef = ref(database, 'posts/' + postId + '/comments');
                
                // Fetch the comments data
                const snapshot = await new Promise((resolve, reject) => {
                    onValue(commentRef, (snapshot) => {
                        resolve(snapshot);
                    }, reject);
                });
                
                const data = snapshot.val();
                let length = 0;
                if (data) {
                    length = Object.keys(data).length;
                    console.log("branch length: " + length);
                } else {
                    console.log("branch is empty");
                }

                let updatedHTML = "<h2>Comments: </h2>";
                for (let i = 0; i < length; i++) {
                    const commentData = await ReadOneDB('posts/' + postId + '/comments/' + i);
                    if (commentData !== null) {
                        updatedHTML += `<div>${commentData.text}</div>`;
                    }
                }
                setCommentHTML(updatedHTML);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [postId]);

    return <div dangerouslySetInnerHTML={{ __html: commentHTML }} />;
}

export default CommentDisplay;
