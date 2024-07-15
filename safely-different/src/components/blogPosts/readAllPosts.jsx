import { getDatabase, ref, get } from 'firebase/database';

export const readAllPostsCallback = async (setPosts) => {
    const db = getDatabase();
    const postsRef = ref(db, 'posts');

    try {
        const snapshot = await get(postsRef);
        if (snapshot.exists()) {
            const postsData = snapshot.val();
            setPosts(Object.entries(postsData).map(([key, value]) => ({ key, ...value })));
        } else {
            setPosts([]);
        }
    } catch (error) {
        console.error("Error reading data:", error);
        setPosts([]);
    }
};