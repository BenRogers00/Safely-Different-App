import React, { useState, useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { auth, database } from '../../firebase/firebase';
import { onAuthStateChanged } from "firebase/auth";
import WriteToDatabase from '../../databaseWriting';
import { ref, push, set } from 'firebase/database';
import DrawingBoard from '../drawing/DrawingBoard';
import NavBar from '../UI/HomepageComponents/NavBar';

function BlogWriter() {
    const [authUser, setAuthUser] = useState(null);
    const editorRef = useRef(null);
    const drawingBoardRef = useRef(null);
    const [path, setPath] = useState("users/null");
    const [uid, setUid] = useState(null);
    const [showCanvas, setShowCanvas] = useState(false);

    //set the path to save the blog post of the logged in user
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                //get user, and use their id to save the blogPost
                setAuthUser(user);
                setPath('users/' + user.uid + '/blogPost');
                setUid(user.uid);
            } else {
                setAuthUser(null);
            }
        });
        return () => {
            listen();
        };
    }, []);

    //save drawing to the database
    const saveDrawing = async () => {
        if (drawingBoardRef.current) {
            const drawingKey = await drawingBoardRef.current.saveDrawing();
            return drawingKey;
        }
        return null;
    };

    //when user clicks post button, show the user a preview of their post, and write their blog post to database as HTML
    const post = async () => {
        const drawingKey = await saveDrawing();
        if (editorRef.current) {
            const dataInput = editorRef.current.getContent();
            const postsRef = ref(database, 'posts');
            const uniquePostRef = push(postsRef);

            //fields that are saved to the database and their data (field: data)
            await set(uniquePostRef, {
                body: dataInput,
                user: uid,
                postRef: uniquePostRef.toString(),
                drawingRef: drawingKey || null
            });

            WriteToDatabase({ dataInput, path });
        }
    };

    return (
        <div>
            <NavBar Mobile ={false}/> {/* putting props inside mobile */}
            {/*if user is logged in show the style-able text box, otherwise tell user they must log in*/}
            {authUser ? (
                <>
                    {/*tinymce text editor API logic */}
                    <Editor
                        apiKey='by46301wfp914l08znnta78iu6169zud0lq4gc8y5whuwwp0'
                        onInit={(_evt, editor) => editorRef.current = editor}
                        initialValue={"Write your post here!"}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                    {/*button to open drawing area*/}
                    <button onClick={() => setShowCanvas(!showCanvas)}>
                        {showCanvas ? "Close the editor" : "Open the editor"}
                    </button>
                    {showCanvas && <DrawingBoard ref={drawingBoardRef} />}
                    <br />
                    <button onClick={post}>Post to your blog!</button>
                </>
            ) : (
                <p>Please log in to create a blog post</p>
            )}
        </div>
    );
}

export default BlogWriter;
