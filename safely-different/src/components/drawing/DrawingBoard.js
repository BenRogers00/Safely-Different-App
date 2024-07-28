import React, { useRef, useEffect } from 'react';
import { Canvas, PatternBrush, Rect, Shadow, PencilBrush, CircleBrush, SprayBrush } from 'fabric';
import { ref, set } from 'firebase/database';
import { database } from '../../firebase/firebase';

const DrawingBoard = () => {
    const canvasRef = useRef(null);
    const drawingModeRef = useRef(null);
    const drawingOptionsRef = useRef(null);
    const drawingColorRef = useRef(null);
    const drawingShadowColorRef = useRef(null);
    const drawingLineWidthRef = useRef(null);
    const drawingShadowWidthRef = useRef(null);
    const drawingShadowOffsetRef = useRef(null);
    const clearRef = useRef(null);
    const drawingModeSelectorRef = useRef(null);
    const saveRef = useRef(null);

    useEffect(() => {
        const canvas = new Canvas(canvasRef.current, {
            isDrawingMode: true
        });

        // Initialize the default brush
        canvas.freeDrawingBrush = new PencilBrush(canvas);
        canvas.freeDrawingBrush.color = '#000000';
        canvas.freeDrawingBrush.width = 1;
        canvas.freeDrawingBrush.shadow = new Shadow({
            blur: 0,
            offsetX: 0,
            offsetY: 0,
            affectStroke: true,
            color: '#000000',
        });

        const handleClear = () => canvas.clear();

        const handleDrawingMode = () => {
            canvas.isDrawingMode = !canvas.isDrawingMode;
            if (canvas.isDrawingMode) {
                drawingModeRef.current.innerHTML = 'Cancel drawing mode';
                drawingOptionsRef.current.style.display = '';
            } else {
                drawingModeRef.current.innerHTML = 'Enter drawing mode';
                drawingOptionsRef.current.style.display = 'none';
            }
        };

        const handleSave = () => {
            const dataURL = canvas.toDataURL('image/png');
            const drawingRef = ref(database, 'drawings/' + Date.now());
            set(drawingRef, {
                image: dataURL
            });
        };

        clearRef.current.onclick = handleClear;
        drawingModeRef.current.onclick = handleDrawingMode;
        saveRef.current.onclick = handleSave;

        const handleDrawingModeSelectorChange = () => {
            const brushType = drawingModeSelectorRef.current.value;
            let brush;

            switch (brushType) {
                case 'hline':
                    brush = new PatternBrush(canvas);
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
                    brush = new PatternBrush(canvas);
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
                case 'square':
                    brush = new PatternBrush(canvas);
                    brush.getPatternSrc = function () {
                        const squareWidth = 10, squareDistance = 2;
                        const patternCanvas = document.createElement('canvas');
                        patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
                        const ctx = patternCanvas.getContext('2d');
                        ctx.fillStyle = this.color;
                        ctx.fillRect(0, 0, squareWidth, squareWidth);
                        return patternCanvas;
                    };
                    break;
                case 'diamond':
                    brush = new PatternBrush(canvas);
                    brush.getPatternSrc = function () {
                        const squareWidth = 10, squareDistance = 5;
                        const patternCanvas = document.createElement('canvas');
                        const rect = new Rect({
                            width: squareWidth,
                            height: squareWidth,
                            angle: 45,
                            fill: this.color
                        });
                        const canvasWidth = rect.getBoundingRect().width;
                        patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
                        rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });
                        const ctx = patternCanvas.getContext('2d');
                        rect.render(ctx);
                        return patternCanvas;
                    };
                    break;
                case 'texture':
                    brush = new PatternBrush(canvas);
                    const img = new Image();
                    img.src = '../assets/honey_im_subtle.png';
                    brush.source = img;
                    break;
                case 'Pencil':
                    brush = new PencilBrush(canvas);
                    break;
                case 'Circle':
                    brush = new CircleBrush(canvas);
                    break;
                case 'Spray':
                    brush = new SprayBrush(canvas);
                    break;
                default:
                    brush = new PencilBrush(canvas);
                    break;
            }

            if (brush) {
                canvas.freeDrawingBrush = brush;
                brush.color = drawingColorRef.current.value;
                brush.width = parseInt(drawingLineWidthRef.current.value, 10) || 1;
                brush.shadow = new Shadow({
                    blur: parseInt(drawingShadowWidthRef.current.value, 10) || 0,
                    offsetX: 0,
                    offsetY: 0,
                    affectStroke: true,
                    color: drawingShadowColorRef.current.value,
                });

                if (brush.getPatternSrc) {
                    brush.source = brush.getPatternSrc.call(brush);
                }
            }
        };

        drawingModeSelectorRef.current.onchange = handleDrawingModeSelectorChange;

        drawingColorRef.current.onchange = function () {
            const brush = canvas.freeDrawingBrush;
            if (brush) {
                brush.color = this.value;
                if (brush.getPatternSrc) {
                    brush.source = brush.getPatternSrc.call(brush);
                }
            }
        };

        drawingShadowColorRef.current.onchange = function () {
            const brush = canvas.freeDrawingBrush;
            if (brush && brush.shadow) {
                brush.shadow.color = this.value;
            }
        };

        drawingLineWidthRef.current.onchange = function () {
            const brush = canvas.freeDrawingBrush;
            if (brush) {
                brush.width = parseInt(this.value, 10) || 1;
                this.previousSibling.innerHTML = this.value;
            }
        };

        drawingShadowWidthRef.current.onchange = function () {
            const brush = canvas.freeDrawingBrush;
            if (brush && brush.shadow) {
                brush.shadow.blur = parseInt(this.value, 10) || 0;
                this.previousSibling.innerHTML = this.value;
            }
        };

        drawingShadowOffsetRef.current.onchange = function () {
            const brush = canvas.freeDrawingBrush;
            if (brush && brush.shadow) {
                brush.shadow.offsetX = parseInt(this.value, 10) || 0;
                brush.shadow.offsetY = parseInt(this.value, 10) || 0;
                this.previousSibling.innerHTML = this.value;
            }
        };

        return () => {
            canvas.dispose();
        };
    }, []);

    return (
        <div>
            <canvas id="c" ref={canvasRef} width={800} height={600} style={{ border: '1px solid #000' }} />
            <div>
                <button ref={drawingModeRef}>Enter drawing mode</button>
                <div ref={drawingOptionsRef} style={{ display: 'none' }}>
                    <label>
                        Brush color:
                        <input ref={drawingColorRef} type="color" id="drawing-color" />
                    </label>
                    <label>
                        Shadow color:
                        <input ref={drawingShadowColorRef} type="color" id="drawing-shadow-color" />
                    </label>
                    <label>
                        Line width:
                        <input ref={drawingLineWidthRef} type="range" id="drawing-line-width" min="0" max="150" />
                    </label>
                    <label>
                        Shadow width:
                        <input ref={drawingShadowWidthRef} type="range" id="drawing-shadow-width" min="0" max="50" />
                    </label>
                    <label>
                        Shadow offset:
                        <input ref={drawingShadowOffsetRef} type="range" id="drawing-shadow-offset" min="0" max="50" />
                    </label>
                    <select ref={drawingModeSelectorRef} id="drawing-mode-selector">
                        <option value="Pencil">Pencil</option>
                        <option value="Circle">Circle</option>
                        <option value="Spray">Spray</option>
                        <option value="hline">Horizontal Line</option>
                        <option value="vline">Vertical Line</option>
                        <option value="square">Square</option>
                        <option value="diamond">Diamond</option>
                        <option value="texture">Texture</option>
                    </select>
                </div>
                <button ref={clearRef}>Clear</button>
                <button ref={saveRef}>Save</button>
            </div>
        </div>
    );
};

export default DrawingBoard;
