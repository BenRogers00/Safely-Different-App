import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { readAllPostsCallback } from './readAllPosts'; 
import CommentTextBox from './writeComment';
import { readOneDBCallback } from '../../readOneEntry';
import CommentDisplay from './readAllComments';

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

    useEffect(() => {
        const fetchUserEmails = () => {
            const emails = {};
            posts.forEach(post => {
                readOneDBCallback(`users/${post.user}/email`, (email) => {
                    emails[post.user] = email;
                    setUserEmails(prevEmails => ({ ...prevEmails, [post.user]: email }));
                });
            });
        };

        if (posts.length > 0) {
            fetchUserEmails();
        }
    }, [posts]);

    function getStrippedPath(inputString) {
        const parts = inputString.split('/');
        parts.splice(0, 3); // remove first 3 parts
        const path = parts.join('/');
        console.log("Stripped path:", path); // debugging
        return path;
    }

    function toggleCommentBox(key) {
        setOpenCommentBoxes(prevState => ({
            ...prevState,
            [key]: !prevState[key]
        }));
        console.log("Toggled comment box for key:", key, openCommentBoxes);
    }

    return (
        <div id="blogDisp">
            <h1>Blog Display</h1>
            {posts.map(post => (
                <div key={post.key} style={{ marginBottom: '20px'}}>
                    <div id='blogPost' style={{backgroundColor:'black', padding: '10px'}}>
                        <div id="userInfo" style={{float:'left', display:'block', marginLeft:'10%'}}>
                            <p>User: {userEmails[post.user]}</p>
                        </div>
                        <br/>
                        <div dangerouslySetInnerHTML={{ __html: post.body }} style={{ color: 'black', backgroundColor: 'whiteSmoke', maxWidth: '80%', display: 'block', marginLeft: '9%', marginRight: '9%', paddingLeft: '1%', paddingRight: '1%', borderRadius: '10px' }}/>
                        <button 
                            onClick={() => toggleCommentBox(post.key)} 
                            style={{backgroundColor:'dodgerblue', marginLeft:'10%', float:'left', borderRadius:'10px', padding:'2px', paddingLeft:'5px', paddingRight:'5px'}}
                        >Show Comments</button><br/>
                        {openCommentBoxes[post.key] && (
                            <CommentTextBox path={getStrippedPath(post.postRef)} />
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
    );
}

export default BlogDisplay;
