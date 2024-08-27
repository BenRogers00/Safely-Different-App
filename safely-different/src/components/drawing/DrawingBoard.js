// The code below is the DrawingBoard.js file that contains the DrawingBoard React component.
// This component allows users to draw on a canvas and save the drawing to the Firebase Realtime Database.
// The saveDrawing method is exposed using the drawingRef prop to allow saving the drawing from outside the component.

import React, { useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
import { Canvas, PencilBrush, Line, Circle, FabricImage, IText } from 'fabric';
import { getDatabase, ref as dbRef, set } from 'firebase/database';

const DrawingBoard = forwardRef((props, drawingRef) => {
    const { imageSrc, isEditing = false, saveDrawing } = props;
    const canvasRef = useRef(null);
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

    // Handle creating and interacting with text fields
    const createTextObject = (pointer) => {
        const text = new IText('Type here', {
            left: pointer.x,
            top: pointer.y,
            fontFamily: fontRef.current.value,
            fill: drawingColorRef.current.value,
            fontSize: parseInt(fontSizeRef.current.value, 10) || 30,
            editable: true
        });

        // Add the text object to the canvas
        fabricCanvasRef.current.add(text);
        fabricCanvasRef.current.setActiveObject(text);
        text.enterEditing();  // Enter editing mode right after creation
        text.selectAll();     // Automatically select the placeholder text

        // Remove "Type here" once the user starts typing
        text.on('editing:entered', () => {
            console.log('Editing started');
            text.selectAll();  // Ensure "Type here" is selected for overwriting
        });

        // Clear "Type here" if the user starts typing
        text.on('changed', () => {
            if (text.text === 'Type here') {
                text.text = '';  // Clear the placeholder
                fabricCanvasRef.current.renderAll();  // Re-render the canvas
            }
        });

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

    // Initialize events for text and other drawing tools
    const handleTextTool = () => {
        fabricCanvasRef.current.isDrawingMode = false; // Disable drawing mode

        // Remove previous event listeners to prevent conflicts
        fabricCanvasRef.current.off('mouse:down');
        fabricCanvasRef.current.off('object:selected');

        // Click to create new text object only when not clicking on an existing object
        fabricCanvasRef.current.on('mouse:down', (event) => {
            const target = fabricCanvasRef.current.findTarget(event.e);
            if (!target) {
                const pointer = fabricCanvasRef.current.getPointer(event.e);
                createTextObject(pointer);
            }
        });

        // Select existing text object to allow editing and moving
        fabricCanvasRef.current.on('object:selected', (event) => {
            if (event.target && event.target.type === 'i-text') {
                fabricCanvasRef.current.setActiveObject(event.target);
                event.target.enterEditing();
            }
        });

        // Apply font size change to the active text object
        fontSizeRef.current.onchange = updateTextProperties;
        fontRef.current.onchange = updateTextProperties;
    };

    return (
        <div id="drawingBoard">
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
                        let isDrawing = false;
                        let line = null;

                        fabricCanvasRef.current.isDrawingMode = false;  // Disable free drawing mode
                        fabricCanvasRef.current.off('mouse:down');  // Clear previous events
                        fabricCanvasRef.current.off('mouse:move');

                        fabricCanvasRef.current.on('mouse:down', (event) => {
                            if (!isDrawing) {
                                const pointer = fabricCanvasRef.current.getPointer(event.e);
                                const points = [pointer.x, pointer.y, pointer.x, pointer.y];
                                line = new Line(points, {
                                    strokeWidth: drawingLineWidthRef.current.value,
                                    fill: drawingColorRef.current.value,
                                    stroke: drawingColorRef.current.value,
                                    selectable: false,
                                    evented: false,
                                });
                                fabricCanvasRef.current.add(line);
                                isDrawing = true;
                            } else {
                                isDrawing = false;
                                line.setCoords();  // Ensure the line gets its final coordinates
                            }
                        });

                        fabricCanvasRef.current.on('mouse:move', (event) => {
                            if (isDrawing && line) {
                                const pointer = fabricCanvasRef.current.getPointer(event.e);
                                line.set({ x2: pointer.x, y2: pointer.y });
                                fabricCanvasRef.current.renderAll();
                            }
                        });

                    }  else if (brushType === 'circle') {
                        let isDrawing = false;
                        let circle = null;
                        let startX, startY;
                
                        fabricCanvasRef.current.isDrawingMode = false; // Disable free drawing mode
                        fabricCanvasRef.current.off('mouse:down');  // Clear previous events
                        fabricCanvasRef.current.off('mouse:move');
                
                        fabricCanvasRef.current.on('mouse:down', (event) => {
                            if (!isDrawing) {
                                const pointer = fabricCanvasRef.current.getPointer(event.e);
                                startX = pointer.x;
                                startY = pointer.y;
                                circle = new Circle({
                                    left: startX,
                                    top: startY,
                                    radius: 1,  // Start with a small radius
                                    strokeWidth: drawingLineWidthRef.current.value,
                                    stroke: drawingColorRef.current.value,
                                    fill: 'transparent',  // Ensure it only has an outline
                                    originX: 'center',
                                    originY: 'center',
                                    selectable: false,
                                    evented: false,
                                });
                                fabricCanvasRef.current.add(circle);
                                isDrawing = true;
                            } else {
                                isDrawing = false;
                                circle.setCoords();  // Finalize the circle
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
                        // Default to free drawing mode (or pencil) if not using line tool
                        fabricCanvasRef.current.off('mouse:down');
                        fabricCanvasRef.current.off('mouse:move');
                        let brush;
                        switch (brushType) {
                            case 'Pencil':
                                brush = new PencilBrush(fabricCanvasRef.current);
                                fabricCanvasRef.current.isDrawingMode = true;  // Enable free drawing mode
                                break;
                            default:
                                brush = new PencilBrush(fabricCanvasRef.current);
                                break;
                        }
                        fabricCanvasRef.current.freeDrawingBrush = brush;
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
                <button ref={clearRef}>Clear</button>
                <span> </span>
                <button ref={saveRef}>Attach Drawing</button>
                <p style={{ fontSize: '12px', color: '#888' }}>
                    Make sure to attach the drawing before posting.
                </p>
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
