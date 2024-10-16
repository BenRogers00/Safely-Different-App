// The code below is the DrawingBoard.js file that contains the DrawingBoard React component.
// This component allows users to draw on a canvas and save the drawing to the Firebase Realtime Database.
// The saveDrawing method is exposed using the drawingRef prop to allow saving the drawing from outside the component.

import React, { useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
import { Canvas, PencilBrush, Line, Circle, FabricImage, IText } from 'fabric';
import { getDatabase, ref as dbRef, set } from 'firebase/database';

const DrawingBoard = forwardRef((props, drawingRef) => {
    const { imageSrc, isEditing = false, saveDrawing, canvasRef } = props;
    const fabricCanvasRef = useRef(null);
    const drawingColorRef = useRef(null);
    const drawingLineWidthRef = useRef(null);
    const fontSizeRef = useRef(null);
    const clearRef = useRef(null);
    const saveRef = useRef(null);
    const fileInputRef = useRef(null);
    const fontRef = useRef(null);
    let currentTextObject = null;

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

    useEffect(() => {
        const canvas = new Canvas(canvasRef.current, { isDrawingMode: true });
        fabricCanvasRef.current = canvas;

        canvas.backgroundColor = '#ffffff';
        canvas.renderAll();
        
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
                fitAndCentralizeImage(img, canvas); // Fit and centralize image
            }).catch((error) => {
                console.error('Error loading image:', error);
            });
        }

        return () => {
            canvas.dispose();
        };
    }, [handleSave, isEditing, imageSrc]);

    // Fit image to canvas if larger, centralize if smaller
    const fitAndCentralizeImage = (img, canvas) => {
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const imageWidth = img.width;
        const imageHeight = img.height;

        let scaleFactor = 1;

        // If image is larger than canvas, scale it down
        if (imageWidth > canvasWidth || imageHeight > canvasHeight) {
            scaleFactor = Math.min(canvasWidth / imageWidth, canvasHeight / imageHeight);
        }

        img.scale(scaleFactor); // Scale the image

        // Centralize the image on canvas if smaller
        const left = (canvasWidth - img.getScaledWidth()) / 2;
        const top = (canvasHeight - img.getScaledHeight()) / 2;

        img.set({
            left: left,
            top: top,
            selectable: false,
            evented: false
        });

        canvas.add(img);
        canvas.sendToBack(img);
        canvas.renderAll();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                FabricImage.fromURL(e.target.result).then((img) => {
                    fitAndCentralizeImage(img, fabricCanvasRef.current);
                }).catch((error) => {
                    console.error('Error loading image:', error);
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const createTextObject = (pointer) => {
        const text = new IText('Type here', {
            left: pointer.x,
            top: pointer.y,
            fontFamily: fontRef.current.value,
            fill: drawingColorRef.current.value,
            fontSize: parseInt(fontSizeRef.current.value, 10) || 30,
            editable: true,
            selectable: true
        });

        fabricCanvasRef.current.add(text);
        fabricCanvasRef.current.setActiveObject(text);
        text.enterEditing();
        text.selectAll();

        currentTextObject = text;
    };

    const updateTextProperties = () => {
        if (currentTextObject) {
            currentTextObject.set({
                fontFamily: fontRef.current.value,
                fontSize: parseInt(fontSizeRef.current.value, 10) || 30,
                fill: drawingColorRef.current.value
            });
            fabricCanvasRef.current.renderAll();
        }
    };

    const handleTextTool = () => {
        fabricCanvasRef.current.isDrawingMode = false;

        fabricCanvasRef.current.off('mouse:down');
        fabricCanvasRef.current.on('mouse:down', (event) => {
            const target = fabricCanvasRef.current.findTarget(event.e);
            if (currentTextObject && !target) {
                currentTextObject.exitEditing();
                fabricCanvasRef.current.discardActiveObject();
                fabricCanvasRef.current.renderAll();
                currentTextObject = null;
            } else if (target && target.type === 'i-text') {
                if (target.isEditing) {
                    currentTextObject = target;
                } else {
                    fabricCanvasRef.current.setActiveObject(target);
                    currentTextObject = target;
                }
            } else if (!currentTextObject && !target) {
                const pointer = fabricCanvasRef.current.getPointer(event.e);
                createTextObject(pointer);
            }
        });

        fontSizeRef.current.onchange = updateTextProperties;
        fontRef.current.onchange = updateTextProperties;
    };

    return (
        <div id="drawingBoardContainer">
            <div id="drawingBoard">
                <canvas ref={canvasRef} width={800} height={600} />
            </div>
            <div id="drawingBoardControls">
                <label>
                    Brush color:
                    <input ref={drawingColorRef} type="color" />
                </label>
                <label>
                    Line width:
                    <input ref={drawingLineWidthRef} type="range" min="1" max="100" defaultValue="1" />
                </label>

                <label>
                    Font size:
                    <select ref={fontSizeRef} defaultValue="30">
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                        <option value="60">60</option>
                        <option value="70">70</option>
                        <option value="80">80</option>
                        <option value="90">90</option>
                        <option value="100">100</option>
                    </select>
                </label>

                <select onChange={(e) => {
                    const brushType = e.target.value;

                    if (brushType === 'line') {
                        fabricCanvasRef.current.isDrawingMode = false;
                        let isDrawing = false;
                        let line = null;

                        fabricCanvasRef.current.off('mouse:down');
                        fabricCanvasRef.current.off('mouse:move');

                        fabricCanvasRef.current.on('mouse:down', (event) => {
                            if (!isDrawing) {
                                const pointer = fabricCanvasRef.current.getPointer(event.e);
                                const points = [pointer.x, pointer.y, pointer.x, pointer.y];
                                line = new Line(points, {
                                    strokeWidth: drawingLineWidthRef.current.value,
                                    stroke: drawingColorRef.current.value,
                                    selectable: false,
                                    evented: false
                                });
                                fabricCanvasRef.current.add(line);
                                isDrawing = true;
                            } else {
                                isDrawing = false;
                                line.setCoords();
                            }
                        });

                        fabricCanvasRef.current.on('mouse:move', (event) => {
                            if (isDrawing && line) {
                                const pointer = fabricCanvasRef.current.getPointer(event.e);
                                line.set({ x2: pointer.x, y2: pointer.y });
                                fabricCanvasRef.current.renderAll();
                            }
                        });
                    } else if (brushType === 'circle') {
                        fabricCanvasRef.current.isDrawingMode = false;
                        let isDrawing = false;
                        let circle = null;
                        let startX, startY;

                        fabricCanvasRef.current.off('mouse:down');
                        fabricCanvasRef.current.off('mouse:move');

                        fabricCanvasRef.current.on('mouse:down', (event) => {
                            if (!isDrawing) {
                                const pointer = fabricCanvasRef.current.getPointer(event.e);
                                startX = pointer.x;
                                startY = pointer.y;
                                circle = new Circle({
                                    left: startX,
                                    top: startY,
                                    radius: 1,
                                    strokeWidth: drawingLineWidthRef.current.value,
                                    stroke: drawingColorRef.current.value,
                                    fill: 'transparent',
                                    originX: 'center',
                                    originY: 'center',
                                    selectable: false,
                                    evented: false
                                });
                                fabricCanvasRef.current.add(circle);
                                isDrawing = true;
                            } else {
                                isDrawing = false;
                                circle.setCoords();
                            }
                        });

                        fabricCanvasRef.current.on('mouse:move', (event) => {
                            if (isDrawing && circle) {
                                const pointer = fabricCanvasRef.current.getPointer(event.e);
                                const radius = Math.sqrt(
                                    Math.pow(pointer.x - startX, 2) + Math.pow(pointer.y - startY, 2)
                                );
                                circle.set({ radius });
                                fabricCanvasRef.current.renderAll();
                            }
                        });
                    } else if (brushType === 'text') {
                        handleTextTool();
                    } else {
                        fabricCanvasRef.current.isDrawingMode = true;
                        fabricCanvasRef.current.off('mouse:down');
                        fabricCanvasRef.current.off('mouse:move');
                        fabricCanvasRef.current.freeDrawingBrush = new PencilBrush(fabricCanvasRef.current);
                    }
                }}>
                    <option value="Pencil">Pencil</option>
                    <option value="line">Line</option>
                    <option value="circle">Circle</option>
                    <option value="text">Text</option>
                </select>

                <br />
                <label>
                    Select Font:
                    <select ref={fontRef}>
                        <option value="Arial">Arial</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Verdana">Verdana</option>
                    </select>
                </label>
                <br />
                <label>
                    Upload Image:
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} />
                </label>
                <br /><br />
                <button ref={clearRef}>Clear</button>
                <span> </span>
                <button ref={saveRef}>Attach Drawing</button>
                <br />
            </div>
        </div>
    );
});

export default DrawingBoard;
