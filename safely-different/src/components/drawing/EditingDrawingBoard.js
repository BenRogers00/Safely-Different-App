// This component is a canvas used on a posts page. It acts just like the regular canvas in DrawingBoard, but it pre-loads an image from the database.
// The component takes the drawingRef to identify the drawing in the db and renders the image inside the canvas. 

import React, { useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
import { Canvas, PencilBrush, PatternBrush, FabricImage } from 'fabric';
import { getDatabase, ref as dbRef, set } from 'firebase/database';

const EditingDrawingBoard = forwardRef((props, drawingRef) => {
    const { imageSrc } = props;
    const canvasRef = useRef(null);
    const fabricCanvasRef = useRef(null);
    const drawingColorRef = useRef(null);
    const drawingLineWidthRef = useRef(null);
    const clearRef = useRef(null);
    const saveRef = useRef(null);

    const handleSave = useCallback(async () => {
        const canvas = fabricCanvasRef.current;
        const dataURL = canvas.toDataURL('image/png');
        const drawingRef = dbRef(getDatabase(), 'drawings/' + Date.now());
        await set(drawingRef, { image: dataURL });
        return drawingRef.toString();
    }, []);

    useImperativeHandle(drawingRef, () => ({
        saveDrawing: handleSave
    }));

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
            canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
        };

        if (imageSrc) {
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
    }, [handleSave, imageSrc]);

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
                    <input ref={drawingLineWidthRef} type="range" min="0" max="150" />
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
            </div>
        </div>
    );
});

export default EditingDrawingBoard;