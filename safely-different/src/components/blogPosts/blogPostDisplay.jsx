import React, { useState, useEffect, useRef } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { readAllPostsCallback } from "./readAllPosts";
import CommentTextBox from "./writeComment";
import { readOneDBCallback } from "../../readOneEntry";
import CommentDisplay from "./readAllComments";
import DrawingComponent from "../drawing/DrawingComponent";
import EditingDrawingBoard from "../drawing/EditingDrawingBoard";
import NavBar from "../UI/HomepageComponents/NavBar";
import "./blogDisplay.css";
import BlogWriter from "./blogWriter";

function BlogDisplay() {
  const [posts, setPosts] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [openComments, setOpenComments] = useState({});
  const [editingImage, setEditingImage] = useState(null); // State for the image being edited
  const [editingPostKey, setEditingPostKey] = useState(null); // State for the post being edited
  const [imageUrls, setImageUrls] = useState({}); // Track image URLs for each post
  const postRefs = useRef({}); // Store refs for each post to scroll to the edited one

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
      posts.forEach((post) => {
        readOneDBCallback(`users/${post.user}/displayName`, (name) => {
          names[post.user] = name;
          setUserNames((prevNames) => ({ ...prevNames, [post.user]: name }));
        });
      });
    };

    if (posts.length > 0) {
      fetchUserNames();
    }
  }, [posts]);

  // Scroll to the post being edited
  useEffect(() => {
    if (editingPostKey && postRefs.current[editingPostKey]) {
      postRefs.current[editingPostKey].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [editingPostKey]);

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
      [postKey]: imageSrc, // Only set the image for the specific post
    }));
  }

  return (
    <div className="overflow-y-auto overflow-x-hidden h-screen bg-gradient-to-b from-teal-400 to teal-600">
      <NavBar Mobile={false} />
      <h1 style={{ fontSize: "3em" }}>User Posts</h1>
      <h2>See what users are talking about!</h2>
      <div id="blogDisp" className={editingPostKey ? "edit-mode" : ""}>
        {posts.map((post) => (
          <div
            key={post.key}
            id="blogPost"
            ref={(el) => (postRefs.current[post.key] = el)} // Set ref for each post
            className={editingPostKey === post.key ? "enlarged" : ""}
          >
            <div id="userInfo" style={{ padding: "10px" }}>
              <p>User: {userNames[post.user]}</p>
            </div>
            <div id="postBody">
              <div
                dangerouslySetInnerHTML={{ __html: post.body }}
                style={{ padding: "10px" }}
              />
              {post.drawingRef && (
                <DrawingComponent
                  drawingRef={post.drawingRef}
                  onEdit={(imageUrl) => handleEditImage(imageUrl, post.key)}
                />
              )}
              {editingPostKey === post.key && (
                <div className="editing-drawing-board">
                  <h2>Edit Drawing</h2>
                  <EditingDrawingBoard
                    imageSrc={editingImage}
                    ref={null}
                    saveDrawing={(imageUrl) =>
                      handleEditImage(imageUrl, post.key)
                    } // Set the image URL for this post
                  />
                  <button onClick={() => setEditingPostKey(null)}>
                    Close Editor
                  </button>
                </div>
              )}
            </div>
            <div id="commentDiv">
              <h3 style={{ color: "black", fontSize: "2em" }}>Comments</h3>
              <CommentTextBox
                path={getStrippedPath(post.postRef)}
                imageUrl={imageUrls[post.key]} // Only pass the image for this post
                toggleCommentBox={() => toggleComments(post.key)}
                postId={post.key}
              />
              <div className="commentSection">
                <CommentDisplay key={`comment-${post.key}`} postId={post.key} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogDisplay;
