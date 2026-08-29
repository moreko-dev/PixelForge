import { useCallback, useContext, useEffect, useRef } from "react";
import { PiLineSegment } from "react-icons/pi";
import { DocumentContext } from "../../../../../contexts/DocumentContext";
import { generateID } from "../../../../../core/CoreUtils";
import Filter from "../../../../../core/layers/Filter";
import LineShape from "../../../../../core/layers/LineShape";
import Shadow from "../../../../../core/layers/Shadow";
import LineTool from "../../../../../core/tools/LineTool";

function LineButton({ activeTool, setActiveTool }) {
    const lineTool = useRef(new LineTool());
    const TOOL_NAME = lineTool.current.name;
    const { projectState, projectCanvasRef, isDrawing, forceUpdateProject } =
        useContext(DocumentContext);

    const lineToolOnMouseDown = useCallback((event) => {
        isDrawing = true;
        lineTool.current.onMouseDown(projectCanvasRef, event);
    }, []);

    const lineToolOnMouseMove = useCallback((event) => {
        lineTool.current.onMouseMove(projectCanvasRef, event);
    }, []);

    const lineToolOnMouseUp = useCallback(() => {
        isDrawing = false;
        lineTool.current.onMouseUp((lineBounds) => {
            const layerID = generateID();
            const lineLayer = new LineShape({
                id: layerID,
                name: `Line-${layerID}`,
                visible: true,
                locked: false,
                shadow: new Shadow(),
                filter: new Filter(),
            });
            lineLayer.sx = lineBounds.sx;
            lineLayer.sy = lineBounds.sy;
            lineLayer.ex = lineBounds.ex;
            lineLayer.ey = lineBounds.ey;
            lineLayer.boundingBox = lineLayer.getBounds();
            projectState.layers.push(lineLayer);
            forceUpdateProject((prev) => !prev);
        });
    }, []);

    useEffect(() => {
        if (activeTool === null) {
            projectCanvasRef.current.style.cursor = "";
        }

        if (activeTool === TOOL_NAME) {
            projectCanvasRef.current.style.cursor = "crosshair";
            projectCanvasRef.current.addEventListener(
                "mousedown",
                lineToolOnMouseDown,
            );
            projectCanvasRef.current.addEventListener(
                "mousemove",
                lineToolOnMouseMove,
            );
            projectCanvasRef.current.addEventListener(
                "mouseup",
                lineToolOnMouseUp,
            );
        } else {
            projectCanvasRef.current.removeEventListener(
                "mousedown",
                lineToolOnMouseDown,
            );
            projectCanvasRef.current.removeEventListener(
                "mousemove",
                lineToolOnMouseMove,
            );
            projectCanvasRef.current.removeEventListener(
                "mouseup",
                lineToolOnMouseUp,
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

// import { useCallback, useContext, useEffect, useRef } from "react";
// import { PiLineSegment } from "react-icons/pi";
// import { DocumentContext } from "../../../../../contexts/DocumentContext";
// import { defaultShapeValues, layersType } from "../../../../../data/Constants";
// import { randomID } from "../../../../../utils/Functions";
// import { getLayerBounds, getMousePosition } from "../../../../../utils/Utils";

// function LineButton({ activeTool, setActiveTool }) {
//     const TOOL_NAME = "line";
//     const isDragging = useRef(false);
//     const lineRef = useRef({ sx: 0, sy: 0, ex: 0, ey: 0 });
//     const { documentState, setDocumentState, documentCanvasRef, isDrawing } =
//         useContext(DocumentContext);

//     const lineModeMouseDownHandler = useCallback((event) => {
//         isDrawing.current = true;
//         isDragging.current = true;
//         const { x, y } = getMousePosition(documentCanvasRef.current, event);
//         [lineRef.current.sx, lineRef.current.sy] = [x, y];
//         const context = documentCanvasRef.current.getContext("2d");
//         context.save();
//     }, []);

//     const lineModeMouseMoveHandler = useCallback((event) => {
//         if (!isDragging.current) return;
//         const { x, y } = getMousePosition(documentCanvasRef.current, event);
//         [lineRef.current.ex, lineRef.current.ey] = [x, y];
//         const context = documentCanvasRef.current.getContext("2d");
//         context.clearRect(
//             0,
//             0,
//             documentCanvasRef.current.width,
//             documentCanvasRef.current.height,
//         );
//         context.beginPath();
//         context.moveTo(lineRef.current.sx, lineRef.current.sy);
//         context.lineTo(lineRef.current.ex, lineRef.current.ey);
//         context.stroke();
//         context.closePath();
//         context.restore();
//     }, []);

//     const lineModeMouseUpHandler = useCallback(() => {
//         isDrawing.current = false;
//         isDragging.current = false;
//         const layerID = randomID(6);
//         const { x, y, w, h } = getLayerBounds(
//             lineRef.current.sx,
//             lineRef.current.sy,
//             lineRef.current.ex,
//             lineRef.current.ey,
//         );
//         const newLayer = {
//             id: layerID,
//             type: layersType.SHAPE_LAYER,
//             properties: {
//                 ...defaultShapeValues,
//                 type: TOOL_NAME,
//                 sx: lineRef.current.sx,
//                 sy: lineRef.current.sy,
//                 ex: lineRef.current.ex,
//                 ey: lineRef.current.ey,
//             },
//             layer: { x, y, width: w, height: h },
//         };
//         setDocumentState((prev) => ({
//             ...prev,
//             layers: [...prev.layers, newLayer],
//         }));
//         lineRef.current = { sx: 0, sy: 0, ex: 0, ey: 0 };
//     }, []);

//     useEffect(() => {
//         if (activeTool === null) {
//             documentCanvasRef.current.style.cursor = "";
//         }

//         if (activeTool === TOOL_NAME) {
//             documentCanvasRef.current.style.cursor = "crosshair";
//             documentCanvasRef.current.addEventListener(
//                 "mousedown",
//                 lineModeMouseDownHandler,
//             );
//             documentCanvasRef.current.addEventListener(
//                 "mousemove",
//                 lineModeMouseMoveHandler,
//             );
//             documentCanvasRef.current.addEventListener(
//                 "mouseup",
//                 lineModeMouseUpHandler,
//             );
//         } else {
//             documentCanvasRef.current.removeEventListener(
//                 "mousedown",
//                 lineModeMouseDownHandler,
//             );
//             documentCanvasRef.current.removeEventListener(
//                 "mousemove",
//                 lineModeMouseMoveHandler,
//             );
//             documentCanvasRef.current.removeEventListener(
//                 "mouseup",
//                 lineModeMouseUpHandler,
//             );
//         }
//     }, [activeTool]);

//     const lineButtonHandler = () => {
//         setActiveTool(activeTool === TOOL_NAME ? null : TOOL_NAME);
//     };

//     return (
//         <button
//             className={`button round ${activeTool === TOOL_NAME ? "active" : ""}`}
//             onClick={lineButtonHandler}
//         >
//             <PiLineSegment />
//         </button>
//     );
// }

// export default LineButton;
