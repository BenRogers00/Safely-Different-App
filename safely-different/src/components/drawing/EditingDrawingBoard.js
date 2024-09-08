// This component is a canvas used on a posts page. It acts just like the regular canvas in DrawingBoard, but it pre-loads an image from the database.
// The component takes the drawingRef to identify the drawing in the db and renders the image inside the canvas. 

import React, { forwardRef } from 'react';
import DrawingBoard from './DrawingBoard';

const EditingDrawingBoard = forwardRef((props, ref) => {
    const { imageSrc, saveDrawing } = props;

    return (
        <DrawingBoard
            canvasRef={ref}  // Forwarding the canvas DOM ref
            imageSrc={imageSrc}
            isEditing={true}  // Set editing mode
            saveDrawing={saveDrawing}
        />
    );
});

export default EditingDrawingBoard;
