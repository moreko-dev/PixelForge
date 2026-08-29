import { useCallback, useContext, useEffect, useRef } from "react";
import { BsBrush } from "react-icons/bs";
import penToolIcon from "../../../../../assets/icons/brush.png";
import { DocumentContext } from "../../../../../contexts/DocumentContext";
import { generateID } from "../../../../../core/CoreUtils";
import Filter from "../../../../../core/layers/Filter";
import PenLayer from "../../../../../core/layers/PenLayer";
import Shadow from "../../../../../core/layers/Shadow";
import PenTool from "../../../../../core/tools/PenTool";

function BrushButton({ activeTool, setActiveTool }) {
    const penTool = useRef(new PenTool());
    const TOOL_NAME = penTool.current.name;
    const { projectState, forceUpdateProject, projectCanvasRef, isDrawing } =
        useContext(DocumentContext);

    const penToolOnMouseUp = useCallback((event) => {
        isDrawing = true;
        penTool.current.onMouseDown(projectCanvasRef, event);
    }, []);

    const penToolOnMouseMove = useCallback((event) => {
        penTool.current.onMouseMove(projectCanvasRef, event);
    }, []);

    const penToolOnMouseDown = useCallback(() => {
        isDrawing = false;
        penTool.current.onMouseUp(projectCanvasRef, (points) => {
            const layerID = generateID();
            const penLayer = new PenLayer({
                id: layerID,
                name: `Pen-${layerID}`,
                visible: true,
                locked: false,
                shadow: new Shadow(),
                filter: new Filter(),
            });
            penLayer.points = points;
            projectState.layers.push(penLayer);
            forceUpdateProject((prev) => !prev);
        });
    }, []);

    useEffect(() => {
        if (activeTool === null) {
            projectCanvasRef.current.style.cursor = "";
        }

        if (activeTool === TOOL_NAME) {
            projectCanvasRef.current.style.cursor = `url(${penToolIcon}), auto`;
            projectCanvasRef.current.addEventListener(
                "mousedown",
                penToolOnMouseDown,
            );
            projectCanvasRef.current.addEventListener(
                "mousemove",
                penToolOnMouseMove,
            );
            projectCanvasRef.current.addEventListener(
                "mouseup",
                penToolOnMouseUp,
            );
        } else {
            projectCanvasRef.current.removeEventListener(
                "mousedown",
                penToolOnMouseDown,
            );
            projectCanvasRef.current.removeEventListener(
                "mousemove",
                penToolOnMouseMove,
            );
            projectCanvasRef.current.removeEventListener(
                "mouseup",
                penToolOnMouseUp,
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

// import { useCallback, useContext, useEffect, useRef } from "react";
// import { BsBrush } from "react-icons/bs";
// import { DocumentContext } from "../../../../../contexts/DocumentContext";
// import { UndoRedoContext } from "../../../../../contexts/UndoRedoContext";
// import { defaultBrushValues, layersType } from "../../../../../data/Constants";
// import { randomID } from "../../../../../utils/Functions";
// import brushCursorIcon from "./../../../../../assets/icons/brush.png";

// function BrushButton({ activeTool, setActiveTool }) {
//     const TOOL_NAME = "brush";
//     const isDragging = useRef(false);
//     const { documentState, setDocumentState, documentCanvasRef, isDrawing } =
//         useContext(DocumentContext);
//     const { saveNewChange } = useContext(UndoRedoContext);
//     const brushPoints = useRef([]);

//     const brushModeMouseDownHandler = useCallback((event) => {
//         isDragging.current = true;
//         isDrawing.current = true;
//         const newPoint = {
//             x: event.offsetX,
//             y: event.offsetY + 15,
//         };
//         brushPoints.current.push({ ...newPoint });
//         const context = documentCanvasRef.current.getContext("2d");
//         context.beginPath();
//         context.moveTo(newPoint.x, newPoint.y);
//         context.lineTo(newPoint.x, newPoint.y);
//         context.stroke();
//     }, []);

//     const brushModeMouseMoveHandler = useCallback((event) => {
//         if (!isDragging.current) return;
//         const newPoint = {
//             x: event.offsetX,
//             y: event.offsetY + 15,
//         };
//         brushPoints.current.push({ ...newPoint });
//         const context = documentCanvasRef.current.getContext("2d");
//         context.lineTo(newPoint.x, newPoint.y);
//         context.stroke();
//     }, []);

//     const brushModeMouseUpHandler = useCallback(() => {
//         saveNewChange();
//         isDrawing.current = false;
//         isDragging.current = false;
//         const layerID = randomID(6);
//         const newLayer = {
//             id: layerID,
//             type: layersType.BRUSH_LAYER,
//             properties: {
//                 ...defaultBrushValues,
//                 points: [...brushPoints.current],
//             },
//         };
//         setDocumentState((prev) => ({
//             ...prev,
//             layers: [...prev.layers, newLayer],
//         }));
//         brushPoints.current = [];
//         const context = documentCanvasRef.current.getContext("2d");
//         context.closePath();
//     }, []);

//     useEffect(() => {
//         if (activeTool === null) {
//             documentCanvasRef.current.style.cursor = "";
//         }

//         if (activeTool === TOOL_NAME) {
//             documentCanvasRef.current.style.cursor = `url(${brushCursorIcon}), auto`;
//             documentCanvasRef.current.addEventListener(
//                 "mousedown",
//                 brushModeMouseDownHandler,
//             );
//             documentCanvasRef.current.addEventListener(
//                 "mousemove",
//                 brushModeMouseMoveHandler,
//             );
//             documentCanvasRef.current.addEventListener(
//                 "mouseup",
//                 brushModeMouseUpHandler,
//             );
//         } else {
//             documentCanvasRef.current.removeEventListener(
//                 "mousedown",
//                 brushModeMouseDownHandler,
//             );
//             documentCanvasRef.current.removeEventListener(
//                 "mousemove",
//                 brushModeMouseMoveHandler,
//             );
//             documentCanvasRef.current.removeEventListener(
//                 "mouseup",
//                 brushModeMouseUpHandler,
//             );
//         }
//     }, [activeTool]);

//     const brushButtonHandler = () => {
//         setActiveTool(activeTool === TOOL_NAME ? null : TOOL_NAME);
//     };

//     return (
//         <button
//             className={`button round ${activeTool === TOOL_NAME ? "active" : ""}`}
//             onClick={brushButtonHandler}
//         >
//             <BsBrush />
//         </button>
//     );
// }

// export default BrushButton;
