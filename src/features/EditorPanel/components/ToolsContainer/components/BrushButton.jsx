import { useCallback, useContext, useEffect, useRef } from "react";
import { BsBrush } from "react-icons/bs";
import { DocumentContext } from "../../../../../contexts/DocumentContext";
import { UndoRedoContext } from "../../../../../contexts/UndoRedoContext";
import { defaultBrushValues, layersType } from "../../../../../data/Constants";
import { randomID } from "../../../../../utils/Functions";
import brushCursorIcon from "./../../../../../assets/icons/brush.png";

function BrushButton({ activeTool, setActiveTool }) {
    const TOOL_NAME = "brush";
    const isDragging = useRef(false);
    const { documentState, setDocumentState, documentCanvasRef, isDrawing } =
        useContext(DocumentContext);
    const { saveNewChange } = useContext(UndoRedoContext);
    const brushPoints = useRef([]);

    const brushModeMouseDownHandler = useCallback((event) => {
        isDragging.current = true;
        isDrawing.current = true;
        const newPoint = {
            x: event.offsetX,
            y: event.offsetY + 15,
        };
        brushPoints.current.push({ ...newPoint });
        const context = documentCanvasRef.current.getContext("2d");
        context.beginPath();
        context.moveTo(newPoint.x, newPoint.y);
        context.lineTo(newPoint.x, newPoint.y);
        context.stroke();
    }, []);

    const brushModeMouseMoveHandler = useCallback((event) => {
        if (!isDragging.current) return;
        const newPoint = {
            x: event.offsetX,
            y: event.offsetY + 15,
        };
        brushPoints.current.push({ ...newPoint });
        const context = documentCanvasRef.current.getContext("2d");
        context.lineTo(newPoint.x, newPoint.y);
        context.stroke();
    }, []);

    const brushModeMouseUpHandler = useCallback(() => {
        saveNewChange();
        isDrawing.current = false;
        isDragging.current = false;
        const layerID = randomID(6);
        const newLayer = {
            id: layerID,
            type: layersType.BRUSH_LAYER,
            properties: {
                ...defaultBrushValues,
                points: [...brushPoints.current],
            },
        };
        setDocumentState((prev) => ({
            ...prev,
            layers: [...prev.layers, newLayer],
        }));
        brushPoints.current = [];
        const context = documentCanvasRef.current.getContext("2d");
        context.closePath();
    }, []);

    useEffect(() => {
        if (activeTool === null) {
            documentCanvasRef.current.style.cursor = "";
        }

        if (activeTool === TOOL_NAME) {
            documentCanvasRef.current.style.cursor = `url(${brushCursorIcon}), auto`;
            documentCanvasRef.current.addEventListener(
                "mousedown",
                brushModeMouseDownHandler,
            );
            documentCanvasRef.current.addEventListener(
                "mousemove",
                brushModeMouseMoveHandler,
            );
            documentCanvasRef.current.addEventListener(
                "mouseup",
                brushModeMouseUpHandler,
            );
        } else {
            documentCanvasRef.current.removeEventListener(
                "mousedown",
                brushModeMouseDownHandler,
            );
            documentCanvasRef.current.removeEventListener(
                "mousemove",
                brushModeMouseMoveHandler,
            );
            documentCanvasRef.current.removeEventListener(
                "mouseup",
                brushModeMouseUpHandler,
            );
        }
    }, [activeTool]);

    const brushButtonHandler = () => {
        setActiveTool(activeTool === TOOL_NAME ? null : TOOL_NAME);
    };

    return (
        <button
            className={`button round ${activeTool === TOOL_NAME ? "active" : ""}`}
            onClick={brushButtonHandler}
        >
            <BsBrush />
        </button>
    );
}

export default BrushButton;
