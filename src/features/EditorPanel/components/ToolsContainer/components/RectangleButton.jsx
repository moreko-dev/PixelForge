import { useCallback, useContext, useEffect, useRef } from "react";
import { PiRectangle } from "react-icons/pi";
import { DocumentContext } from "../../../../../contexts/DocumentContext";
import { defaultShapeValues, layersType } from "../../../../../data/Constants";
import { randomID } from "../../../../../utils/Functions";
import { getLayerBounds, getMousePosition } from "../../../../../utils/Utils";

function RectangleButton({ activeTool, setActiveTool }) {
    const TOOL_NAME = "rect";
    const isDragging = useRef(false);
    const rectangleRef = useRef({ sx: 0, sy: 0, ex: 0, ey: 0, w: 0, h: 0 });
    const { documentState, setDocumentState, documentCanvasRef, isDrawing } =
        useContext(DocumentContext);

    const rectangleModeMouseDownHandler = useCallback((event) => {
        isDrawing.current = true;
        isDragging.current = true;
        const { x, y } = getMousePosition(documentCanvasRef.current, event);
        [rectangleRef.current.sx, rectangleRef.current.sy] = [x, y];
        const context = documentCanvasRef.current.getContext("2d");
        context.save();
    }, []);

    const rectangleModeMouseMoveHandler = useCallback((event) => {
        if (!isDragging.current) return;
        const { x, y } = getMousePosition(documentCanvasRef.current, event);
        const context = documentCanvasRef.current.getContext("2d");
        context.save();
        [rectangleRef.current.w, rectangleRef.current.h] = [
            x - rectangleRef.current.sx,
            y - rectangleRef.current.sy,
        ];
        [rectangleRef.current.ex, rectangleRef.current.ey] = [x, y];
        context.clearRect(
            0,
            0,
            documentCanvasRef.current.width,
            documentCanvasRef.current.height,
        );
        context.strokeRect(
            rectangleRef.current.sx,
            rectangleRef.current.sy,
            rectangleRef.current.w,
            rectangleRef.current.h,
        );
        context.restore();
    }, []);

    const rectangleModeMouseUpHandler = useCallback(() => {
        isDrawing.current = false;
        isDragging.current = false;
        const layerID = randomID(6);
        const { x, y, w, h } = getLayerBounds(
            rectangleRef.current.sx,
            rectangleRef.current.sy,
            rectangleRef.current.ex,
            rectangleRef.current.ey,
        );
        const newLayer = {
            id: layerID,
            type: layersType.SHAPE_LAYER,
            properties: {
                ...defaultShapeValues,
                type: TOOL_NAME,
                sx: rectangleRef.current.sx,
                sy: rectangleRef.current.sy,
                ex: rectangleRef.current.ex,
                ey: rectangleRef.current.ey,
                width: rectangleRef.current.w,
                height: rectangleRef.current.h,
            },
            layer: { x, y, width: w, height: h },
        };
        setDocumentState((prev) => ({
            ...prev,
            layers: [...prev.layers, newLayer],
        }));
        rectangleRef.current = { sx: 0, sy: 0, ex: 0, ey: 0, w: 0, h: 0 };
    }, []);

    useEffect(() => {
        if (activeTool === null) {
            documentCanvasRef.current.style.cursor = "";
        }

        if (activeTool === TOOL_NAME) {
            documentCanvasRef.current.style.cursor = "crosshair";
            documentCanvasRef.current.addEventListener(
                "mousedown",
                rectangleModeMouseDownHandler,
            );
            documentCanvasRef.current.addEventListener(
                "mousemove",
                rectangleModeMouseMoveHandler,
            );
            documentCanvasRef.current.addEventListener(
                "mouseup",
                rectangleModeMouseUpHandler,
            );
        } else {
            documentCanvasRef.current.removeEventListener(
                "mousedown",
                rectangleModeMouseDownHandler,
            );
            documentCanvasRef.current.removeEventListener(
                "mousemove",
                rectangleModeMouseMoveHandler,
            );
            documentCanvasRef.current.removeEventListener(
                "mouseup",
                rectangleModeMouseUpHandler,
            );
        }
    }, [activeTool]);

    const rectangleButtonHandler = () => {
        setActiveTool(activeTool === TOOL_NAME ? null : TOOL_NAME);
    };

    return (
        <button
            className={`button round ${activeTool === TOOL_NAME ? "active" : ""}`}
            onClick={rectangleButtonHandler}
        >
            <PiRectangle />
        </button>
    );
}

export default RectangleButton;
