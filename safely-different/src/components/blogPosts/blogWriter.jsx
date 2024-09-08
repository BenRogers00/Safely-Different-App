import React, { useState, useRef, useEffect } from "react";
import { auth, database } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import WriteToDatabase from "../../databaseWriting";
import { ref, push, set } from "firebase/database";
import DrawingBoard from "../drawing/DrawingBoard";
import NavBar from "../UI/HomepageComponents/NavBar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles
import Modal from "./postedModal";
import { Link } from "react-router-dom";

function BlogWriter() {
  const [authUser, setAuthUser] = useState(null);
  const drawingBoardRef = useRef(null);
  const canvasRef = useRef(null); // Ref for scrolling to the canvas
  const [path, setPath] = useState("users/null");
  const [uid, setUid] = useState(null);
  const [showCanvas, setShowCanvas] = useState(false);
  const [value, setValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setPath("users/" + user.uid + "/blogPost");
        setUid(user.uid);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  // Scroll to canvas when showCanvas is true
  useEffect(() => {
    if (showCanvas && canvasRef.current) {
      canvasRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [showCanvas]);

  const saveDrawing = async () => {
    if (drawingBoardRef.current) {
      const drawingKey = await drawingBoardRef.current.saveDrawing();
      return drawingKey;
    }
    return null;
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const post = async () => {
    const drawingKey = await saveDrawing();
    if (value) {
      const dataInput = value;
      const postsRef = ref(database, "posts");
      const uniquePostRef = push(postsRef);

      await set(uniquePostRef, {
        body: dataInput,
        user: uid,
        postRef: uniquePostRef.toString(),
        drawingRef: drawingKey || null,
      });

      WriteToDatabase({ dataInput, path });
      openModal();
    }
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"], // removes formatting button
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const handleEditorChange = (content) => {
    setValue(content);
    console.log("Editor content:", content); // This will print the content to the console for debugging
  };

  return (
    <div className="overflow-y-auto overflow-x-hidden h-screen bg-gradient-to-b from-teal-400 to teal-600">
      <NavBar Mobile={false} />
      {authUser ? (
        <>
          <br />
          <div id="quill-box">
            <ReactQuill
              theme="snow"
              value={value}
              onChange={handleEditorChange}
              modules={modules}
              formats={formats}
            />
          </div>
          <button onClick={() => setShowCanvas(!showCanvas)}>
            {showCanvas ? "Close the editor" : "Open the editor"}
          </button>

          {showCanvas && (
            <DrawingBoard ref={drawingBoardRef} canvasRef={canvasRef} />
          )}

          <button onClick={post}>Post to your blog!</button>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <h1>Post Success!</h1>
            <p>Feel free to leave this page at any time</p>
            <Link to={"/"}>
              <button>Home</button>
            </Link>
            <button onClick={closeModal}>Close</button>
          </Modal>
        </>
      ) : (
        <p>Please log in to create a blog post</p>
      )}
    </div>
  );
}

export default BlogWriter;
