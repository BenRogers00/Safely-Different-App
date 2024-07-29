// The code below is the DrawingComponent.js file that contains the DrawingComponent React component. 
// This component fetches the image URL of a drawing from the Firebase Realtime Database and displays the image. 
// The drawingRef prop is used to identify the drawing in the database.

import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebase/firebase';

const DrawingComponent = ({ drawingRef }) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            const drawingKey = drawingRef.split('/').pop(); // Extract the key part
            const drawingRefPath = ref(database, 'drawings/' + drawingKey);
            onValue(drawingRefPath, (snapshot) => {
                const data = snapshot.val();
                if (data && data.image) {
                    console.log('Fetched image URL:', data.image); // Debugging
                    setImageUrl(data.image);
                } else {
                    console.log('No image found for drawingRef:', drawingRef); // Debugging
                }
            });
        };

        fetchImage();
    }, [drawingRef]);

    return (
        <>
            {imageUrl ? (
                <img src={imageUrl} alt="Drawing" style={{ display: 'block', margin: '10px auto', maxWidth: '80%' }} />
            ) : (
                <p>Loading drawing...</p> // Debugging
            )}
        </>
    );
};

export default DrawingComponent;
