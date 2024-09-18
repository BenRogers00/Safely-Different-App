import React, { useState, useEffect } from 'react';
import { database } from '../../../firebase/firebase';
import { ref, onValue, push, set } from 'firebase/database';
import { useParams } from 'react-router-dom';
import './MessagePage.css';

const MessagePage = () => {
    const { id } = useParams();
    const [messageData, setMessageData] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [replyData, setReplyData] = useState({});
    const [adminReply, setAdminReply] = useState(''); // State for admin reply to message

    useEffect(() => {
        const messageRef = ref(database, `Contacts/${id}`);
        onValue(messageRef, snapshot => {
            setMessageData(snapshot.val());
        });

        const commentsRef = ref(database, `Contacts/${id}/comments`);
        onValue(commentsRef, snapshot => {
            const commentsList = [];
            snapshot.forEach(childSnapshot => {
                const comment = childSnapshot.val();
                comment.id = childSnapshot.key;
                commentsList.push(comment);
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

    const handleReplyChange = (commentId, e) => {
        setReplyData(prev => ({
            ...prev,
            [commentId]: e.target.value
        }));
    };

    const handleReplySubmit = async (commentId, e) => {
        e.preventDefault();
        if (!replyData[commentId]) {
            alert('Please enter a reply.');
            return;
        }

        try {
            const repliesRef = ref(database, `Contacts/${id}/comments/${commentId}/replies`);
            const newReplyRef = push(repliesRef);
            await set(newReplyRef, { text: replyData[commentId] });
            setReplyData(prev => ({
                ...prev,
                [commentId]: ''
            }));
        } catch (error) {
            console.error('Error adding reply:', error.message);
            alert(`Error adding reply: ${error.message}`);
        }
    };

    // Handle admin reply to the message
    const handleAdminReplySubmit = async (e) => {
        e.preventDefault();
        if (!adminReply) {
            alert('Please enter a reply.');
            return;
        }

        try {
            const messageRef = ref(database, `Contacts/${id}/adminReply`);
            await set(messageRef, adminReply);
            setAdminReply('');
        } catch (error) {
            console.error('Error adding admin reply:', error.message);
            alert(`Error adding admin reply: ${error.message}`);
        }
    };

    return (
        <div className="message-page-container">
            {messageData ? (
                <div className="message-content">
                    <h1>{messageData.firstName} {messageData.lastName}'s Message</h1>
                    <p>{messageData.message}</p>

                    {/* Display Admin Reply to the message */}
                    {messageData.adminReply && (
                        <div className="admin-reply-block">
                            <h3>Admin Reply:</h3>
                            <p>{messageData.adminReply}</p>
                        </div>
                    )}

                    {/* Form to reply to the message */}
                    <form onSubmit={handleAdminReplySubmit} className="admin-reply-form">
                        <textarea
                            value={adminReply}
                            onChange={(e) => setAdminReply(e.target.value)}
                            placeholder="Reply to this message..."
                        />
                        <button type="submit">Submit Admin Reply</button>
                    </form>

                    {/* Comments Section */}
                    <div className="comments-section">
                        <h2>Comments</h2>
                        {comments.map((comment) => (
                            <div key={comment.id} className="comment-block">
                                <p className="user-comment">{comment.text}</p>

                                {/* Show replies under each comment */}
                                {comment.replies && (
                                    <div className="replies">
                                        {Object.keys(comment.replies).map(replyId => (
                                            <p key={replyId} className="admin-reply">Admin: {comment.replies[replyId].text}</p>
                                        ))}
                                    </div>
                                )}

                                {/* Reply form for each comment */}
                                <form onSubmit={(e) => handleReplySubmit(comment.id, e)} className="reply-form">
                                    <textarea
                                        value={replyData[comment.id] || ''}
                                        onChange={(e) => handleReplyChange(comment.id, e)}
                                        placeholder="Admin reply..."
                                    />
                                    <button type="submit">Submit Reply</button>
                                </form>
                            </div>
                        ))}

                        {/* Comment form */}
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
};

export default MessagePage;
