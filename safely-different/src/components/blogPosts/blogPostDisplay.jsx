import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { readAllPostsCallback } from './readAllPosts'; 
import CommentTextBox from './writeComment';
import { readOneDBCallback } from '../../readOneEntry';
import CommentDisplay from './readAllComments';
import DrawingComponent from '../drawing/DrawingComponent';
import EditingDrawingBoard from '../drawing/EditingDrawingBoard'; // Adjust the import path as needed
import NavBar from '../UI/HomepageComponents/NavBar';
import './blogDisplay.css'; 

function BlogDisplay() {
    const [posts, setPosts] = useState([]);
    const [userNames, setUserNames] = useState({});
    const [openCommentBoxes, setOpenCommentBoxes] = useState({});
    const [editingImage, setEditingImage] = useState(null); // State for the image being edited
    const [editingPostKey, setEditingPostKey] = useState(null); // State for the post being edited
    const [imageUrl, setImageUrl] = useState(null); // State for the image URL for comments

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                readAllPostsCallback(setPosts); // get all posts
            } else {
                setPosts([]);
            }
        });
        return () => {
            listen();
        };
    }, []);

    useEffect(() => {
        const fetchUserNames = () => {
            const names = {};
            posts.forEach(post => {
                readOneDBCallback(`users/${post.user}/displayName`, (name) => {
                    names[post.user] = name;
                    setUserNames(prevNames => ({ ...prevNames, [post.user]: name }));
                });
            });
        };

        if (posts.length > 0) {
            fetchUserNames();
        }
    }, [posts]);

    function getStrippedPath(inputString) {
        const parts = inputString.split('/');
        parts.splice(0, 3); // Remove first 3 parts
        const path = parts.join('/');
        return path;
    }

    function toggleCommentBox(key) {
        setOpenCommentBoxes(prevState => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    }

    function handleEditImage(imageSrc, postKey) {
        setEditingImage(imageSrc);
        setEditingPostKey(postKey);
    }

    return (
        <div>
            <NavBar Mobile={false} />

            <div id="blogDisp">
                <h1>Blog Display</h1>
                {posts.map(post => (
                    <div key={post.key}>
                        <div id='blogPost'>
                            <div id="userInfo" style={{ padding: '10px' }}>
                                <p>User: {userNames[post.user]}</p>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: post.body }} style={{ padding: '10px' }} />
                            {post.drawingRef && (
                                <DrawingComponent drawingRef={post.drawingRef} onEdit={(imageUrl) => handleEditImage(imageUrl, post.key)} />
                            )}
                            {editingPostKey === post.key && (
                                <div className="editing-drawing-board">
                                    <h2>Edit Drawing</h2>
                                    <EditingDrawingBoard 
                                        imageSrc={editingImage} 
                                        ref={null} 
                                        saveDrawing={setImageUrl}  // Set the image URL to be passed to CommentTextBox
                                    />
                                    <button onClick={() => setEditingPostKey(null)}>Close Editor</button>
                                </div>
                            )}
                            <button onClick={() => toggleCommentBox(post.key)}>Show Comments</button><br />
                            {openCommentBoxes[post.key] && (
                                <CommentTextBox path={getStrippedPath(post.postRef)} imageUrl={imageUrl} />  // Pass imageUrl to CommentTextBox
                            )}
                        </div>
                        <div id="comments">
                            {openCommentBoxes[post.key] && (
                                <CommentDisplay key={`comment-${post.key}`} postId={post.key} />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default BlogDisplay;
