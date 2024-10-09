import { getDatabase, ref, get } from "firebase/database";

<div className="overflow-y-auto overflow-x-hidden h-screen bg-gradient-to-b from-teal-400 to teal-600"></div>

export const readAllPostsCallback = async (setPosts) => {
  //get all the posts from the database
  const db = getDatabase();
  const postsRef = ref(db, "pdfPosts");

  try {
    //use postsRef (location posts are saved) to get the post data
    const snapshot = await get(postsRef);
    if (snapshot.exists()) {
      const postsData = snapshot.val();
      //map post data
      setPosts(
        Object.entries(postsData).map(([key, value]) => ({ key, ...value }))
      );
    } else {
      setPosts([]);
    }
  } catch (error) {
    //appropriate error message
    console.error("Error reading data:", error);
    setPosts([]);
  }
};
