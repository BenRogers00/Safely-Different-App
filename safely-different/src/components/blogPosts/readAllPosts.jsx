import { getDatabase, ref, get } from 'firebase/database';

export const readAllPostsCallback = async (setPosts) => {
    //get all the posts from the database
    const db = getDatabase();
    const postsRef = ref(db, 'posts');

    try {
        //use postsRef (location posts are saved) to get the post data
        const snapshot = await get(postsRef);
        if (snapshot.exists()) {
            const postsData = snapshot.val();
            //map post data
            setPosts(Object.entries(postsData).map(([key, value]) => ({ key, ...value })));
        } else {
            setPosts([]);
        }
    } catch (error) {
        //appropriate error message
        console.error("Error reading data:", error);
        setPosts([]);
    }
};