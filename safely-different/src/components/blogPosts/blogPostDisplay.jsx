import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { readAllPostsCallback } from './readAllPosts'; 
import CommentTextBox from './writeComment';
import { readOneDBCallback } from '../../readOneEntry';
import CommentDisplay from './readAllComments';
import DrawingComponent from '../drawing/DrawingComponent';
import NavBar from '../UI/HomepageComponents/NavBar';
import { ReturnName } from '../UsersDetails';
import './blogDisplay.css'; 

function BlogDisplay() {
    const [posts, setPosts] = useState([]);
    const [userNames, setuserNames] = useState({});
    const [openCommentBoxes, setOpenCommentBoxes] = useState({});

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

    // Get user's name from their post
    useEffect(() => {
        const fetchuserNames = () => {
            const names = {};
            posts.forEach(post => {
                // Use callback function to get a user's name to use later
                readOneDBCallback(`users/${post.user}/displayName`, (name) => {
                    names[post.user] = name;
                    setuserNames(prevnames => ({ ...prevnames, [post.user]: name }));
                });
            });
        };

        // If there are posts, get the names from the posts
        if (posts.length > 0) {
            fetchuserNames();
        }
    }, [posts]);

    // Get the path to use when getting info from the database
    function getStrippedPath(inputString) {
        const parts = inputString.split('/');
        parts.splice(0, 3); // Remove first 3 parts
        const path = parts.join('/');
        return path;
    }

    // Function to show/hide the comment text box
    function toggleCommentBox(key) {
        setOpenCommentBoxes(prevState => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    }

    // Display for blog posts
    return (
        <div>
            <NavBar Mobile={false} /> {/* putting props inside mobile */}

        <div id="blogDisp">
            <h1>Blog Display</h1>
            {/* Get the posts and map using keys */}
            {posts.map(post => (
                // Add some styling for the posts and display them
                <div key={post.key}>
                    <div id='blogPost'>
                        {/* Display user's name to attribute to their post */}
                        <div id="userInfo" style={{padding:'10px'}}>
                            <p>User: {userNames[post.user]}</p>
                        </div>
                        {/* Display the post's body text using the HTML it is saved as */}
                        <div dangerouslySetInnerHTML={{ __html: post.body }} style={{padding:'10px'}}/>
                        {post.drawingRef && (
                            // Use the drawing functionality
                            <DrawingComponent drawingRef={post.drawingRef} />
                        )}
                        {/* Button to display the comment text box or hide it */}
                        <button onClick={() => toggleCommentBox(post.key)}>Show Comments</button><br/>
                        {openCommentBoxes[post.key] && (
                            // Use the stripped path from function to get a clean path that can be referenced to in the database  
                            <CommentTextBox path={getStrippedPath(post.postRef)} />
                        )}
                    </div>
                    <div id="comments">
                        {/* Display comments */}
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
