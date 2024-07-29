import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { readAllPostsCallback } from './readAllPosts'; 
import CommentTextBox from './writeComment';
import { readOneDBCallback } from '../../readOneEntry';
import CommentDisplay from './readAllComments';
import DrawingComponent from '../drawing/DrawingComponent';


function BlogDisplay() {
    const [posts, setPosts] = useState([]);
    const [userEmails, setUserEmails] = useState({});
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

    //get user's email from their post
    useEffect(() => {
        const fetchUserEmails = () => {
            const emails = {};
            posts.forEach(post => {
                //use callback function to get a user's email to use later
                readOneDBCallback(`users/${post.user}/email`, (email) => {
                    emails[post.user] = email;
                    setUserEmails(prevEmails => ({ ...prevEmails, [post.user]: email }));
                });
            });
        };

        //if there are posts, get the emails from the posts
        if (posts.length > 0) {
            fetchUserEmails();
        }
    }, [posts]);

    //get the path to use when getting info from the database
    function getStrippedPath(inputString) {
        const parts = inputString.split('/');
        parts.splice(0, 3); // remove first 3 parts
        const path = parts.join('/');
        return path;
    }

    //function to show/hide the comment text box
    function toggleCommentBox(key) {
        setOpenCommentBoxes(prevState => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    }

    //display for blog posts
    return (
        <div id="blogDisp">
            {/*~~~~~~~~ADD NAV BAR HERE~~~~~~~~~~~~~ */}
            <h1>Blog Display</h1>
            {/*get the posts and map using keys */}
            {posts.map(post => (
                //add some styling for the posts and display them
                <div key={post.key} style={{ marginBottom: '20px'}}>
                    <div id='blogPost' style={{backgroundColor:'black', padding: '10px'}}>
                        {/* display user's email to attribute to their post*/}
                        <div id="userInfo" style={{float:'left', display:'block', marginLeft:'10%'}}>
                            <p>User: {userEmails[post.user]}</p>
                        </div>
                        <br/>
                        {/*display the post's body text using the html it is saved as*/}
                        <div dangerouslySetInnerHTML={{ __html: post.body }} style={{ color: 'black', backgroundColor: 'whiteSmoke', maxWidth: '80%', display: 'block', marginLeft: '9%', marginRight: '9%', paddingLeft: '1%', paddingRight: '1%', borderRadius: '10px' }}/>
                        {post.drawingRef && (
                            //use the drawing functionality
                            <DrawingComponent drawingRef={post.drawingRef} />
                        )}
                        {/*button to display the comment text box or hide it*/}
                        <button 
                            onClick={() => toggleCommentBox(post.key)} 
                            style={{backgroundColor:'dodgerblue', marginLeft:'10%', float:'left', borderRadius:'10px', padding:'2px', paddingLeft:'5px', paddingRight:'5px'}}
                        >Show Comments</button><br/>
                        {openCommentBoxes[post.key] && (
                            //use the stripped path from function to get a clean path that can be referenced to in the database  
                            <CommentTextBox path={getStrippedPath(post.postRef)} />
                        )}
                    </div>
                    <div id="comments">
                        {/* display comments*/}
                        {openCommentBoxes[post.key] && (
                            <CommentDisplay key={`comment-${post.key}`} postId={post.key} />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BlogDisplay;
