// The code below is the DrawingBoard.js file that contains the DrawingBoard React component.
// This component allows users to draw on a canvas and save the drawing to the Firebase Realtime Database.
// The saveDrawing method is exposed using the drawingRef prop to allow saving the drawing from outside the component.

import React, { useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
import { Canvas, PencilBrush, PatternBrush, FabricImage } from 'fabric';
import { getDatabase, ref as dbRef, set } from 'firebase/database';

const DrawingBoard = forwardRef((props, drawingRef) => {
    const { imageSrc, isEditing = false, saveDrawing } = props;
    const canvasRef = useRef(null);
    const fabricCanvasRef = useRef(null);
    const drawingColorRef = useRef(null);
    const drawingLineWidthRef = useRef(null);
    const clearRef = useRef(null);
    const saveRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleSave = useCallback(async () => {
        const canvas = fabricCanvasRef.current;
        const dataURL = canvas.toDataURL('image/png');
        const drawingRef = dbRef(getDatabase(), 'drawings/' + Date.now());
        await set(drawingRef, { image: dataURL });
        if (saveDrawing) {
            saveDrawing(dataURL);  // Pass the image URL back
        }
        return drawingRef.toString();
    }, [saveDrawing]);

    useImperativeHandle(drawingRef, () => ({
        saveDrawing: handleSave
    }));

    // Initialize the canvas and tools
    useEffect(() => {
        const canvas = new Canvas(canvasRef.current, { isDrawingMode: true });
        fabricCanvasRef.current = canvas;

        canvas.freeDrawingBrush = new PencilBrush(canvas);
        canvas.freeDrawingBrush.color = '#000000';
        canvas.freeDrawingBrush.width = 1;

        clearRef.current.onclick = () => canvas.clear();
        saveRef.current.onclick = handleSave;

        drawingColorRef.current.onchange = function () {
            canvas.freeDrawingBrush.color = this.value;
        };

        drawingLineWidthRef.current.onchange = function () {
            const width = parseInt(this.value, 10) || 1;
            canvas.freeDrawingBrush.width = width;
        };

        // Load image if editing and imageSrc is provided
        if (isEditing && imageSrc) {
            FabricImage.fromURL(imageSrc).then((img) => {
                canvas.add(img);
                canvas.renderAll();
            }).catch((error) => {
                console.error('Error loading image:', error);
            });
        }

        return () => {
            canvas.dispose();
        };
    }, [handleSave, isEditing, imageSrc]);

    // Handle file input change and load the image to the canvas
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                FabricImage.fromURL(e.target.result).then((img) => {
                    img.scaleToHeight(750);  // Set the image height
                    img.scaleToWidth(750);   // Set the image width
                    fabricCanvasRef.current.add(img); // Use the correct canvas instance
                    fabricCanvasRef.current.renderAll();
                }).catch((error) => {
                    console.error('Error loading image:', error);
                });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid #000' }} />
            <div>
                <label>
                    Brush color:
                    <input ref={drawingColorRef} type="color" />
                </label>
                <label>
                    Line width:
                    <input ref={drawingLineWidthRef} type="range" min="1" max="100" defaultValue="1" />
                </label>

                <select onChange={(e) => {
                    const brushType = e.target.value;
                    let brush;
                    switch (brushType) {
                        case 'hline':
                            brush = new PatternBrush(fabricCanvasRef.current);
                            brush.getPatternSrc = function () {
                                const patternCanvas = document.createElement('canvas');
                                patternCanvas.width = patternCanvas.height = 10;
                                const ctx = patternCanvas.getContext('2d');
                                ctx.strokeStyle = this.color;
                                ctx.lineWidth = 5;
                                ctx.beginPath();
                                ctx.moveTo(0, 5);
                                ctx.lineTo(10, 5);
                                ctx.closePath();
                                ctx.stroke();
                                return patternCanvas;
                            };
                            break;
                        case 'vline':
                            brush = new PatternBrush(fabricCanvasRef.current);
                            brush.getPatternSrc = function () {
                                const patternCanvas = document.createElement('canvas');
                                patternCanvas.width = patternCanvas.height = 10;
                                const ctx = patternCanvas.getContext('2d');
                                ctx.strokeStyle = this.color;
                                ctx.lineWidth = 5;
                                ctx.beginPath();
                                ctx.moveTo(5, 0);
                                ctx.lineTo(5, 10);
                                ctx.closePath();
                                ctx.stroke();
                                return patternCanvas;
                            };
                            break;
                        default:
                            brush = new PencilBrush(fabricCanvasRef.current);
                            break;
                    }
                    fabricCanvasRef.current.freeDrawingBrush = brush;
                }}>
                    <option value="Pencil">Pencil</option>
                    <option value="hline">Horizontal Line</option>
                    <option value="vline">Vertical Line</option>
                </select>
                <br />
                <button ref={clearRef}>Clear</button>
                <span> </span>
                <button ref={saveRef}>Save</button>
                <br />
                <label>
                    Upload Image:
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} />
                </label>
            </div>
        </div>
    );
});

export default DrawingBoard;
