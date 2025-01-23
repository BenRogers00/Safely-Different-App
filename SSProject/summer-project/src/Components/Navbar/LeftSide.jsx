import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AppContext/AppContext';
import { doc, setDoc, collection, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

const LeftSide = () => {
  const { user, userData } = useContext(AuthContext);
  const collectionRef = collection(db, "posts");
  
  const [searchTerm, setSearchTerm] = useState("");  
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

 
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);

    if (query !== "") {
      const filtered = allPosts.filter((post) =>
        post?.text?.toLowerCase().includes(query)
      );
      setFilteredPosts(filtered);
    }
  };
  
  useEffect(() => {
    const postData = async () => {
      const q = query(collectionRef, orderBy("timestamp", "asc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const posts = snapshot.docs.map(doc => doc.data());
        setAllPosts(posts);  // Store all posts
        setFilteredPosts(posts);  // Initially, show all posts
      });
      return () => unsubscribe();
    };
    
    postData();
  }, []);

  return (
    <div className='flex flex-col h-screen bg-gray-100 pb-4 border-2 rounded-r-xl shadow-lg'>
     

 
      <div className='flex flex-col items-center relative'>
        <img
          className='h-28 w-full rounded-r-xl' 
          src={userData?.image } alt="User Logo" />
      </div>

 <div className="px-4 py-2">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          placeholder="Search posts..."
        />
      </div>
      
      {filteredPosts.length > 0 && query!== null && (
        <div className="w-full max-h-60 overflow-y-auto">
          <ul className="bg-white border rounded-lg">
            {filteredPosts.map((post, index) => (
              <li
                key={index}
                className="cursor-pointer p-2 hover:bg-gray-200"
                onClick={() => window.open(post.pdfUrl, "_blank")} // Open PDF
              >
                {post.text}
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}

export default LeftSide;
