import React, { useState, useRef, useContext, useReducer, useEffect } from "react";
import { AuthContext } from "../AppContext/AppContext";
import { doc, setDoc, collection, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { PostsReducer, postActions, postsStates } from "../AppContext/PostReducer";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import PostCard from "./PostCard";
import {GitHub, Guthub} from "react-feather"
import IconButton from "./IconButton";
import { pdf } from "@react-pdf/renderer";

const Main = () => {
  const { user, userData } = useContext(AuthContext);
  const text = useRef("");
  const scrollRef = useRef(null);  
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);  
  const [selectedCategory, setSelectedCategory] = useState("");  
  const collectionRef = collection(db, "posts");
  const postRef = doc(collection(db, "posts"));
  const document = postRef.id;
  const [state, dispatch] = useReducer(PostsReducer, postsStates);
  const { SUBMIT_POST, HANDLE_ERROR } = postActions;
  const [progressBar, setProgressBar] = useState(0); 
  const [filteredPosts, setFilteredPosts] = useState([]);

 const handleCategoryFilter = (category) => {
  if(category === "show all"){
    setFilteredPosts(state?.posts);
  }else{
    const filtered = state?.posts?.filter(post =>post?.category === category);
    setFilteredPosts(filtered || [])
  }
 }

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
  
  // Ensure text input is not empty
  if (text.current.value.trim() === "") {
    alert("Please enter Title before submitting.");
    return;
  }
  if (!selectedCategory) {
    alert("Please select a category.");
    return;
  }

  if (!pdfUrl){
    alert("Please Upload file.");
    return;
  }

  try {
    await setDoc(postRef, {
      documentId: document,
      uid: user?.uid || userData?.uid,
      logo: user?.photoURL,
      name: user?.displayName || userData?.name,
      email: user?.email || userData?.email,
      text: text.current.value,
      pdfUrl: pdfUrl,  
      category: selectedCategory, 
      timestamp: serverTimestamp(),
    });
    
    
    text.current.value = "";
    setPdfUrl(null);
    setFile(null);
    setSelectedCategory("");
  } catch (err) {
    dispatch({ type: HANDLE_ERROR });
    alert(err.message);
    console.log(err.message);
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
                  placeholder="Please enter Title!!!"
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
          <div className="flex ">

          <label htmlFor="category" className=" mb-2 text-sm font-medium">
    Select Category
  </label>
  <select
    id="category"
    className="block w-full p-2 border rounded-md"
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
  >
    <option value="">-- Choose a category --</option>
    <option value="safety documentation">Safety Documentation</option>
    <option value="user manual">User Manual</option>
    <option value="safety standards">Safety Standards</option>
    <option value="case studies">Case Studies</option>
  </select>

            <label htmlFor="addPdf" className="cursor-pointer flex items-center">
            <img className="h-10 mr-4" src="/add-image.png" alt="addImage"></img>
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

      <div className=" flex px-2 py-2 mr-auto gap-2">
      <IconButton text={"show all"} onClick={() => handleCategoryFilter("show all")}>
      <GitHub size={20} />
      </IconButton>

      <IconButton text={"safety documentation"} onClick={() => handleCategoryFilter("safety documentation")}>
      <GitHub size={20} />
      </IconButton>

      <IconButton text={"user manual"} onClick={() => handleCategoryFilter("user manual")}>
      <GitHub size={20} />
      </IconButton>

      <IconButton text={"safety standards"} onClick={() => handleCategoryFilter("safety standards")}>
      <GitHub size={20} />
      </IconButton>

      <IconButton text={"case studies"} onClick={() => handleCategoryFilter("case studies")}>
      <GitHub size={20} />
      </IconButton>
        
      </div>


      <div className="flex flex-col py-4 w-full">
        {state?.error ? (
          <div className="flex justify-center items-center">
            <div>Error</div>
          </div>
        ) : (
          
          <div className="flex flex-wrap justify-between ">
            {filteredPosts?.length > 0 &&
    filteredPosts?.map((post, index) => {
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
          category={post?.category}
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
