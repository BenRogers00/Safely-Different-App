import React, { useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { readAllPostsCallback } from './readAllPosts'; 
import CommentTextBox from './writeComment';
import { readOneDBCallback } from '../../readOneEntry';
import CommentDisplay from './readAllComments';
import DrawingComponent from '../drawing/DrawingComponent';
import EditingDrawingBoard from '../drawing/EditingDrawingBoard';
import NavBar from '../UI/HomepageComponents/NavBar';
import './blogDisplay.css'; 

function BlogDisplay() {
    const [posts, setPosts] = useState([]);
    const [userNames, setUserNames] = useState({});
    const [openComments, setOpenComments] = useState({});
    const [editingImage, setEditingImage] = useState(null); // State for the image being edited
    const [editingPostKey, setEditingPostKey] = useState(null); // State for the post being edited
    const [imageUrls, setImageUrls] = useState({}); // Track image URLs for each post

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                readAllPostsCallback(setPosts); // Get all posts
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

    // Get the path to use when getting info from the database
    function getStrippedPath(inputString) {
        const parts = inputString.split("/");
        parts.splice(0, 3); // Remove first 3 parts
        const path = parts.join("/");
        return path;
    }

    // Function to show/hide the comment section
    function toggleComments(postKey) {
        setOpenComments((prevState) => ({
            ...prevState,
            [postKey]: !prevState[postKey],
        }));
    }

    // Handle setting the image URL for a specific post
    function handleEditImage(imageSrc, postKey) {
        setEditingImage(imageSrc);
        setEditingPostKey(postKey);
        setImageUrls((prevState) => ({
            ...prevState,
            [postKey]: imageSrc // Only set the image for the specific post
        }));
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
                                        saveDrawing={(imageUrl) => handleEditImage(imageUrl, post.key)}  // Set the image URL for this post
                                    />
                                    <button onClick={() => setEditingPostKey(null)}>Close Editor</button>
                                </div>
                            )}

                            {/* Comment input field always visible */}
                            <CommentTextBox 
                                path={getStrippedPath(post.postRef)} 
                                imageUrl={imageUrls[post.key]} // Only pass the image for this post
                                toggleCommentBox={() => toggleComments(post.key)} 
                                postId={post.key} 
                            />

                            {/* Button to show/hide the comments */}
                            <button onClick={() => toggleComments(post.key)}>
                                {openComments[post.key] ? 'Hide Comments' : 'Show Comments'}
                            </button>

                            {/* Only show the comments if they are toggled open */}
                            {openComments[post.key] && (
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
