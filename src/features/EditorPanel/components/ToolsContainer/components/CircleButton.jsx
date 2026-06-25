import { useCallback, useContext, useEffect, useRef } from "react";
import { PiCircle } from "react-icons/pi";
import { DocumentContext } from "../../../../../contexts/DocumentContext";
import { defaultShapeValues, layersType } from "../../../../../data/Constants";
import { randomID } from "../../../../../utils/Functions";
import { getMousePosition, getRadius } from "../../../../../utils/Utils";

function CircleButton({ activeTool, setActiveTool }) {
    const TOOL_NAME = "circle";
    const isDragging = useRef(false);
    const circleRef = useRef({ x: 0, y: 0, radius: 0 });
    const { documentState, setDocumentState, documentCanvasRef, isDrawing } =
        useContext(DocumentContext);

    const circleModeMouseDownHandler = useCallback((event) => {
        isDrawing.current = true;
        isDragging.current = true;
        const { x, y } = getMousePosition(documentCanvasRef.current, event);
        [circleRef.current.x, circleRef.current.y] = [x, y];
        const context = documentCanvasRef.current.getContext("2d");
        context.save();
    }, []);

    const circleModeMouseMoveHandler = useCallback((event) => {
        if (!isDragging.current) return;
        const { x, y } = getMousePosition(documentCanvasRef.current, event);
        circleRef.current.radius = getRadius(
            circleRef.current.x,
            circleRef.current.y,
            x,
            y,
        );
        const context = documentCanvasRef.current.getContext("2d");
        context.clearRect(
            0,
            0,
            documentCanvasRef.current.width,
            documentCanvasRef.current.height,
        );
        context.beginPath();
        context.arc(
            circleRef.current.x,
            circleRef.current.y,
            circleRef.current.radius,
            0,
            Math.PI * 2,
        );
        context.stroke();
        context.closePath();
        context.restore();
    }, []);

    const circleModeMouseUpHandler = useCallback(() => {
        isDrawing.current = false;
        isDragging.current = false;
        const layerID = randomID(6);
        const newLayer = {
            id: layerID,
            type: layersType.SHAPE_LAYER,
            properties: {
                ...defaultShapeValues,
                type: TOOL_NAME,
                x: circleRef.current.x,
                y: circleRef.current.y,
                radius: circleRef.current.radius,
            },
        };
        setDocumentState((prev) => ({
            ...prev,
            layers: [...prev.layers, newLayer],
        }));
        circleRef.current = { x: 0, y: 0, radius: 0 };
    }, []);

    useEffect(() => {
        if (activeTool === null) {
            documentCanvasRef.current.style.cursor = "";
        }

        if (activeTool === TOOL_NAME) {
            documentCanvasRef.current.style.cursor = "crosshair";
            documentCanvasRef.current.addEventListener(
                "mousedown",
                circleModeMouseDownHandler,
            );
            documentCanvasRef.current.addEventListener(
                "mousemove",
                circleModeMouseMoveHandler,
            );
            documentCanvasRef.current.addEventListener(
                "mouseup",
                circleModeMouseUpHandler,
            );
        } else {
            documentCanvasRef.current.removeEventListener(
                "mousedown",
                circleModeMouseDownHandler,
            );
            documentCanvasRef.current.removeEventListener(
                "mousemove",
                circleModeMouseMoveHandler,
            );
            documentCanvasRef.current.removeEventListener(
                "mouseup",
                circleModeMouseUpHandler,
            );
        }
    }, [activeTool]);

    const circleButtonHandler = () => {
        setActiveTool(activeTool === TOOL_NAME ? null : TOOL_NAME);
    };

    return (
        <button
            className={`button round ${activeTool === TOOL_NAME ? "active" : ""}`}
            onClick={circleButtonHandler}
        >
            <PiCircle />
        </button>
    );
}

export default CircleButton;
