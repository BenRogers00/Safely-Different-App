import React, { useState, useRef, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import PostCard from "./PostCard";
import PSPDFKit from "pspdfkit";
import NavBar from "../UI/HomepageComponents/NavBar";



const PdfMain = () => {
  const [user, setAuthUser] = useState(null);
  const text = useRef("");
  const scrollRef = useRef("");
  const [pdfpost, setPdfPost] = useState([]); // New state for PDF posts
  const [file, setFile] = useState(null);
  const collectionRef = collection(db, "pdfPosts"); // Separate collection for pdfPosts
  const [path, setPath] = useState("users/null");
  
  const [error, setError] = useState(null);
  const [progressBar, setProgressBar] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const viewerRef = useRef(null);
  const [uid, setUid] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const postRef = doc(collectionRef);
  const document = postRef.id;
  const storage = getStorage();
  const metadata = {
    contentType: "application/pdf",
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

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setPath("users/" + user.uid + "/pdfPost");
        setUid(user.uid);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  useEffect(() => {
    if (file && viewerRef.current) { // Ensure viewerRef is attached to a valid element
      PSPDFKit.load({
        container: viewerRef.current, // Attach to the valid DOM element
        document: file, // The PDF file to display
      }).then((instance) => {
        console.log("PSPDFKit loaded", instance);
      }).catch((error) => {
        console.error("Error loading PSPDFKit", error);
      });
    }
  }, [file]);
  
  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        try {
          const idTokenResult = await user.getIdTokenResult();
          setIsAdmin(!!idTokenResult.claims.admin);
        } catch (error) {
          console.error("Error fetching user token:", error);
        }
      }
    };
    fetchUserRole();
  }, [user]);

  

  

  const submitPdf = async () => {
    if (!file) {
      alert("Please select a PDF file to upload.");
      return;
    }

    const fileType = file.type;
    const isPdf = fileType === "application/pdf";
    if (!isPdf) {
      alert("Please upload a valid PDF file.");
      return;
    }

    try {
      const storageRef = ref(storage, `pdfs/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
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
          setError(error);
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFile(downloadURL); // Set the PDF URL
            // Add PDF to Firestore
            const newPdfPost = {
              documentId: document,
              uid: user?.uid ,
              email: user?.email ,
              text: text.current.value,
              url: downloadURL,
              timestamp: serverTimestamp(),
              uid,
            };
             setDoc(postRef, newPdfPost);
             text.current.value = "";
             setPdfUrl(null);
             setFile(null);
          });
        }
      );
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }
  };

  

  useEffect(() => {
    const postData = async () => {
      const q = query(collectionRef, orderBy("timestamp", "asc"));
      const unsubscribe = onSnapshot(q, (doc) => {
        setPdfPost(doc?.docs?.map((item) => item?.data())); // Update pdfpost with Firestore data
        scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
        setFile(null);
        setProgressBar(0);
      });
      return () => unsubscribe();
    };
    postData();
  }, []);

  return (
    <div className="overflow-y-auto overflow-x-hidden h-screen bg-gradient-to-b from-teal-400 to teal-600" >
    <div className="flex flex-col items-center">
      <NavBar Mobile={false} />
      <div className="flex flex-col py-4 w-full bg-white rounded-3xl shadow-lg">
        <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-4 w-full">
          <form className="w-full">
            <div className="flex justify-between items-center">
              <div className="w-full ml-4">
                <input
                  type="text"
                  name="text"
                  placeholder={`What's on your mind`}
                  className="outline-none w-full bg-white rounded-md"
                  ref={text}
                />
              </div>
              <div className="mx-4">
                  {pdfUrl && (
                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                      View Uploaded PDF
                    </a>
                  )}
                </div>
              <div className="mr-4">
                
              </div>
            </div>
          </form>
        </div>
  
        <div className="flex justify-around items-center pt-4">
          <div className="flex items-center">
            <label htmlFor="addPdf" className="cursor-pointer flex items-center">
              <input
                id="addPdf"
                type="file"
                onChange={handleUpload}
                accept="application/pdf" // Only allow PDF files
              />
              <button variant="text" onClick={submitPdf}>
                Upload PDF
              </button>
            </label>
          </div>
          {progressBar > 0 && (
            <div className="flex items-center ml-4">
              <span className="mr-2">Uploading: {progressBar}%</span>
              <div style={{ width: "100px", backgroundColor: "#e0e0e0" }}>
                <div
                  style={{ width: `${progressBar}%`, backgroundColor: "#3b82f6" }}
                  className="py-1 rounded-md"
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
  
      {/* Error Handling */}
      
      <div className="flex flex-col py-4 w-1/2">

  {pdfpost?.length > 0 &&
  pdfpost?.map((pdfItem, index) => {
    return (
      <React.Fragment key={index}>
        <PostCard
          name={user?.name}
          text={pdfItem.text}
          email={pdfItem.email}
          pdf={pdfItem.url}
          timestamp={new Date(pdfItem.timestamp?.toDate())?.toUTCString()}
        />
      </React.Fragment>
    );
  })}
</div>
      
  
      <div ref={scrollRef}></div>
    </div>
    </div>
  );
} 
export default PdfMain;
