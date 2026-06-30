import { useCallback, useContext, useEffect, useRef } from "react";
import { PiLineSegment } from "react-icons/pi";
import { DocumentContext } from "../../../../../contexts/DocumentContext";
import { defaultShapeValues, layersType } from "../../../../../data/Constants";
import { randomID } from "../../../../../utils/Functions";
import { getMousePosition } from "../../../../../utils/Utils";

function LineButton({ activeTool, setActiveTool }) {
    const TOOL_NAME = "line";
    const isDragging = useRef(false);
    const lineRef = useRef({ sx: 0, sy: 0, ex: 0, ey: 0 });
    const { documentState, setDocumentState, documentCanvasRef, isDrawing } =
        useContext(DocumentContext);

    const lineModeMouseDownHandler = useCallback((event) => {
        isDrawing.current = true;
        isDragging.current = true;
        const { x, y } = getMousePosition(documentCanvasRef.current, event);
        [lineRef.current.sx, lineRef.current.sy] = [x, y];
        const context = documentCanvasRef.current.getContext("2d");
        context.save();
    }, []);

    const lineModeMouseMoveHandler = useCallback((event) => {
        if (!isDragging.current) return;
        const { x, y } = getMousePosition(documentCanvasRef.current, event);
        [lineRef.current.ex, lineRef.current.ey] = [x, y];
        const context = documentCanvasRef.current.getContext("2d");
        context.clearRect(
            0,
            0,
            documentCanvasRef.current.width,
            documentCanvasRef.current.height,
        );
        context.beginPath();
        context.moveTo(lineRef.current.sx, lineRef.current.sy);
        context.lineTo(lineRef.current.ex, lineRef.current.ey);
        context.stroke();
        context.closePath();
        context.restore();
    }, []);

    const lineModeMouseUpHandler = useCallback(() => {
        isDrawing.current = false;
        isDragging.current = false;
        const layerID = randomID(6);
        const newLayer = {
            id: layerID,
            type: layersType.SHAPE_LAYER,
            properties: {
                ...defaultShapeValues,
                type: TOOL_NAME,
                sx: lineRef.current.sx,
                sy: lineRef.current.sy,
                ex: lineRef.current.ex,
                ey: lineRef.current.ey,
            },
        };
        setDocumentState((prev) => ({
            ...prev,
            layers: [...prev.layers, newLayer],
        }));
        lineRef.current = { sx: 0, sy: 0, ex: 0, ey: 0 };
    }, []);

    useEffect(() => {
        if (activeTool === null) {
            documentCanvasRef.current.style.cursor = "";
        }

        if (activeTool === TOOL_NAME) {
            documentCanvasRef.current.style.cursor = "crosshair";
            documentCanvasRef.current.addEventListener(
                "mousedown",
                lineModeMouseDownHandler,
            );
            documentCanvasRef.current.addEventListener(
                "mousemove",
                lineModeMouseMoveHandler,
            );
            documentCanvasRef.current.addEventListener(
                "mouseup",
                lineModeMouseUpHandler,
            );
        } else {
            documentCanvasRef.current.removeEventListener(
                "mousedown",
                lineModeMouseDownHandler,
            );
            documentCanvasRef.current.removeEventListener(
                "mousemove",
                lineModeMouseMoveHandler,
            );
            documentCanvasRef.current.removeEventListener(
                "mouseup",
                lineModeMouseUpHandler,
            );
        }
    }, [activeTool]);

    const lineButtonHandler = () => {
        setActiveTool(activeTool === TOOL_NAME ? null : TOOL_NAME);
    };

    return (
        <button
            className={`button round ${activeTool === TOOL_NAME ? "active" : ""}`}
            onClick={lineButtonHandler}
        >
            <PiLineSegment />
        </button>
    );
}

export default LineButton;
