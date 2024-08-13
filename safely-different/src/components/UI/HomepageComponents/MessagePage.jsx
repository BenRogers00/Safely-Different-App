import React, { useState, useEffect } from 'react';
import { database } from '../../../firebase/firebase'; 
import { ref, onValue, push, set } from 'firebase/database';
import { useParams } from 'react-router-dom'; // Import useParams
import './MessagePage.css';

const MessagePage = () => {
    const { id } = useParams();
    const [messageData, setMessageData] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        // Reference to the contact message
        const messageRef = ref(database, `Contacts/${id}`);
        onValue(messageRef, snapshot => {
            setMessageData(snapshot.val());
        });

        const commentsRef = ref(database, `Contacts/${id}/comments`);
        onValue(commentsRef, snapshot => {
            const commentsList = [];
            snapshot.forEach(childSnapshot => {
                commentsList.push(childSnapshot.val());
            });
            setComments(commentsList);
        });
    }, [id]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment) {
            alert('Please enter a comment.');
            return;
        }

        try {
            const commentsRef = ref(database, `Contacts/${id}/comments`);
            const newCommentRef = push(commentsRef);
            await set(newCommentRef, { text: newComment });
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error.message);
            alert(`Error adding comment: ${error.message}`);
        }
    };

    return (
        <div className="message-page-container">
            {messageData ? (
                <div className="message-content">
                    <h1>{messageData.firstName} {messageData.lastName}'s Message</h1>
                    <p>{messageData.message}</p>
                    <div className="comments-section">
                        <h2>Comments</h2>
                        {comments.map((comment, index) => (
                            <p key={index}>{comment.text}</p>
                        ))}
                        <form onSubmit={handleCommentSubmit}>
                            <textarea 
                                value={newComment} 
                                onChange={handleCommentChange} 
                                placeholder="Add a comment..."
                            />
                            <button type="submit">Submit Comment</button>
                        </form>
                    </div>
                </div>
            ) : (
                <p>Loading message...</p>
            )}
        </div>
    );
}

export default MessagePage;
