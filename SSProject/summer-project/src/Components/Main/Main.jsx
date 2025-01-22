import React, { useState, useRef, useContext, useReducer, useEffect } from "react";
import { AuthContext } from "../AppContext/AppContext";
import { doc, setDoc, collection, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { PostsReducer, postActions, postsStates } from "../AppContext/PostReducer";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import PostCard from "./PostCard";

const Main = () => {
  const { user, userData } = useContext(AuthContext);
  const text = useRef("");
  const scrollRef = useRef(null);  // Initialize ref
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);  // Store PDF URL
  const collectionRef = collection(db, "posts");
  const postRef = doc(collection(db, "posts"));
  const document = postRef.id;
  const [state, dispatch] = useReducer(PostsReducer, postsStates);
  const { SUBMIT_POST, HANDLE_ERROR } = postActions;
  const [progressBar, setProgressBar] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");  // For search input
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    if (query === "") {
      setFilteredPosts([]);
    } else {
      const filtered = state?.posts?.filter((post) =>
        post.text.toLowerCase().includes(query)
      );
      setFilteredPosts(filtered || []);
    }
  };

  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
    
    // Only allow PDF files
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Only PDF files are allowed.");
    }
  };

  const submitPdf = async () => {
    if (!file) return;

    try {
      const storageRef = ref(getStorage(), `pdfs/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file, { contentType: file.type });

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgressBar(progress);
        },
        (error) => {
          alert(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setPdfUrl(downloadURL);  // Store the PDF URL after upload
        }
      );
    } catch (err) {
      dispatch({ type: HANDLE_ERROR });
      alert(err.message);
      console.log(err.message);
    }
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (text.current.value !== "") {
      try {
        await setDoc(postRef, {
          documentId: document,
          uid: user?.uid || userData?.uid,
          logo: user?.photoURL,
          name: user?.displayName || userData?.name,
         email: user?.email || userData?.email,
        titile: text.current.value,
          pdfUrl: pdfUrl,  // Add the PDF URL to the post data
          timestamp: serverTimestamp(),
        });
        text.current.value = "";
        setPdfUrl(null);
        setFile(null);
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    } else {
      dispatch({ type: HANDLE_ERROR });
    }
  };

  useEffect(() => {
    const postData = async () => {
      const q = query(collectionRef, orderBy("timestamp", "asc"));
      await onSnapshot(q, (doc) => {
        dispatch({
          type: SUBMIT_POST,
          posts: doc?.docs?.map((item) => item?.data()),
        });
        if (scrollRef?.current) {
          scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
        setProgressBar(0);
      });
    };
    return () => postData();
  }, [SUBMIT_POST]);

  return (
    <div className="flex flex-col items-center">
{/* Search Bar */}
<div className="w-full flex justify-center py-4">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-1/2 p-2 border rounded-md"
        />
      </div>

      {/* Suggested Posts */}
      {filteredPosts.length > 0 && (
        <div className="w-full max-h-60 overflow-y-auto">
          <ul className="bg-white border rounded-lg">
            {filteredPosts.map((post, index) => (
              <li
                key={index}
                className="cursor-pointer p-2 hover:bg-gray-200"
                onClick={() => window.open(post.pdfUrl, "_blank")} // Open PDF
              >
                {post.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Post Submission Section */}
     
        

      
      <div className="flex flex-col py-4 w-full bg-white rounded-3xl shadow-lg">
        <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-4 w-full">
          <img
            className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
            src="/worklogin.png"
            alt="Bordered avatar"
          />
          <form className="w-full" onSubmit={handleSubmitPost}>
            <div className="flex justify-between items-center">
              <div className="w-full ml-4">
                <input
                  type="text"
                  name="text"
                  placeholder="What's on your mind"
                  className="outline-none w-full bg-white rounded-md"
                  ref={text}
                />
              </div>
              <div className="mx-4">
                {pdfUrl && (
                  <div className="w-24 h-24 border border-gray-400 flex justify-center items-center">
                    <span>PDF</span>
                  </div>
                )}
              </div>
              <div className="mr-4">
                <button variant="text" type="submit">
                  Share
                </button>
              </div>
            </div>
          </form>
        </div>
        <span
          style={{ width: `${progressBar}%` }}
          className="bg-blue-700 py-1 rounded-md"
        ></span>
        <div className="flex justify-around items-center pt-4">
          <div className="flex items-center">
            <label htmlFor="addPdf" className="cursor-pointer flex items-center">
              <div className="h-10 mr-4">PDF</div>
              <input
                id="addPdf"
                type="file"
                accept="application/pdf"
                style={{ display: "none" }}
                onChange={handleUpload}
              />
            </label>
            {file && (
              <button variant="text" onClick={submitPdf}>
                Upload PDF
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col py-4 w-full">
        {state?.error ? (
          <div className="flex justify-center items-center">
            <div>Error</div>
          </div>
        ) : (
          <div>
            {state?.posts?.length > 0 &&
              state?.posts?.map((post, index) => {
                return (
                  <PostCard
                    key={index}
                    logo={post?.logo}
                    id={post?.documentId}
                    uid={post?.uid}
                    name={post?.name}
                    email={post?.email}
                    text={post?.text}
                    timestamp={new Date(post?.timestamp?.toDate())?.toUTCString()}
                    pdf={post?.pdfUrl}
                  />
                );
              })}
          </div>
        )}
      </div>
      <div ref={scrollRef} className="scroll-anchor"></div>
    </div>
  );
};

export default Main;
