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
                onValue(commentRef, async (snapshot) => {
                    if (snapshot.exists()) {
                        const comments = snapshot.val();
                        let updatedHTML = "<h2>Comments: </h2>";
                        const commentKeys = Object.keys(comments);

                        for (let key of commentKeys) {
                            const commentData = comments[key];
                            if (commentData !== null) {
                                updatedHTML += `
                                    <div style="
                                        border: 1px solid #ddd;
                                        border-radius: 8px;
                                        padding: 10px;
                                        margin-bottom: 10px;
                                        background-color: #f9f9f9;
                                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                                    ">
                                        <div style="
                                            font-weight: bold;
                                            color: #333;
                                            margin-bottom: 10px;
                                            margin-right: 10px;
                                            display:contents;
                                            ">
                                            ${commentData.user}
                                        </div>
                                        <div style="
                                            color: #555;
                                            line-height: 1.5;
                                        ">
                                            ${commentData.text}
                                        </div>
                                    </div>
                                `;
                            }
                        }
                        setCommentHTML(updatedHTML);
                    } else {
                        setCommentHTML("<h2>Comments: </h2><div>No comments available.</div>");
                    }
                });
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [postId]);

    return <div dangerouslySetInnerHTML={{ __html: commentHTML }} />;
}

export default CommentDisplay;
