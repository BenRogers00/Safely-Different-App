import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { readAllPostsCallback } from "./readAllPosts"; 
import CommentTextBox from './writeComment';

function BlogDisplay() {
    const [posts, setPosts] = useState([]);
    const [displayCommentBox, setDisplayCommentBox] = useState(false);

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

    function getStrippedPath(inputString) {
        const parts = inputString.split('/');
        parts.shift();
        parts.shift();
        parts.shift();
        const path = parts.join('/');
        console.log(path)
        return path;
    }

    return (
        <div style={{ backgroundColor: 'whitesmoke', maxWidth: '80%', display: 'block', marginLeft: '9%', marginRight: '9%', paddingLeft: '1%', paddingRight: '1%', borderRadius: '10px' }} id="blogDisp">
            <h1>Blog Display</h1>
            {posts.map(post => (
                <div key={post.key} style={{ marginBottom: '20px' }}>
                    <div dangerouslySetInnerHTML={{ __html: post.body }} />
                    <button onClick={() => setDisplayCommentBox(true)}>Post a comment</button>
                    {displayCommentBox && (
                        <CommentTextBox path={getStrippedPath(post.postRef)} />
                    )}
                </div>
            ))}
        </div>
    );
}

export default BlogDisplay;
