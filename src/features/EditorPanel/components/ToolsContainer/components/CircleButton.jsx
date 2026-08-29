import { useCallback, useContext, useEffect, useRef } from "react";
import { PiCircle } from "react-icons/pi";
import { DocumentContext } from "../../../../../contexts/DocumentContext";
import { generateID } from "../../../../../core/CoreUtils";
import CircleShape from "../../../../../core/layers/CircleShape";
import Filter from "../../../../../core/layers/Filter";
import Shadow from "../../../../../core/layers/Shadow";
import CircleTool from "../../../../../core/tools/CircleTool";

function CircleButton({ activeTool, setActiveTool }) {
    const circleTool = useRef(new CircleTool());
    const TOOL_NAME = circleTool.current.name;
    const { projectState, forceUpdateProject, projectCanvasRef, isDrawing } =
        useContext(DocumentContext);

    const circleToolOnMouseDown = useCallback((event) => {
        isDrawing = true;
        circleTool.current.onMouseDown(projectCanvasRef, event);
    }, []);

    const circleToolOnMouseMove = useCallback((event) => {
        circleTool.current.onMouseMove(projectCanvasRef, event);
    }, []);

    const circleModeMouseUpHandler = useCallback(() => {
        isDrawing = false;
        circleTool.current.onMouseUp((circleBounds) => {
            const layerID = generateID();
            const circleLayer = new CircleShape({
                id: layerID,
                name: `Circle-${layerID}`,
                visible: true,
                locked: false,
                shadow: new Shadow(),
                filter: new Filter(),
            });
            circleLayer.x = circleBounds.x;
            circleLayer.y = circleBounds.y;
            circleLayer.radius = circleBounds.radius;
            circleLayer.boundingBox = circleLayer.getBounds();
            projectState.layers.push(circleLayer);
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
                circleToolOnMouseDown,
            );
            projectCanvasRef.current.addEventListener(
                "mousemove",
                circleToolOnMouseMove,
            );
            projectCanvasRef.current.addEventListener(
                "mouseup",
                circleModeMouseUpHandler,
            );
        } else {
            projectCanvasRef.current.removeEventListener(
                "mousedown",
                circleToolOnMouseDown,
            );
            projectCanvasRef.current.removeEventListener(
                "mousemove",
                circleToolOnMouseMove,
            );
            projectCanvasRef.current.removeEventListener(
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

// import { useCallback, useContext, useEffect, useRef } from "react";
// import { PiCircle } from "react-icons/pi";
// import { DocumentContext } from "../../../../../contexts/DocumentContext";
// import { defaultShapeValues, layersType } from "../../../../../data/Constants";
// import { randomID } from "../../../../../utils/Functions";
// import {
//     getCircleLayerBounds,
//     getMousePosition,
//     getRadius,
// } from "../../../../../utils/Utils";

// function CircleButton({ activeTool, setActiveTool }) {
//     const TOOL_NAME = "circle";
//     const isDragging = useRef(false);
//     const circleRef = useRef({ x: 0, y: 0, radius: 0 });
//     const { documentState, setDocumentState, documentCanvasRef, isDrawing } =
//         useContext(DocumentContext);

//     const circleModeMouseDownHandler = useCallback((event) => {
//         isDrawing.current = true;
//         isDragging.current = true;
//         const { x, y } = getMousePosition(documentCanvasRef.current, event);
//         [circleRef.current.x, circleRef.current.y] = [x, y];
//         const context = documentCanvasRef.current.getContext("2d");
//         context.save();
//     }, []);

//     const circleModeMouseMoveHandler = useCallback((event) => {
//         if (!isDragging.current) return;
//         const { x, y } = getMousePosition(documentCanvasRef.current, event);
//         circleRef.current.radius = getRadius(
//             circleRef.current.x,
//             circleRef.current.y,
//             x,
//             y,
//         );
//         const context = documentCanvasRef.current.getContext("2d");
//         context.clearRect(
//             0,
//             0,
//             documentCanvasRef.current.width,
//             documentCanvasRef.current.height,
//         );
//         context.beginPath();
//         context.arc(
//             circleRef.current.x,
//             circleRef.current.y,
//             circleRef.current.radius,
//             0,
//             Math.PI * 2,
//         );
//         context.stroke();
//         context.closePath();
//         context.restore();
//     }, []);

//     const circleModeMouseUpHandler = useCallback(() => {
//         isDrawing.current = false;
//         isDragging.current = false;
//         const layerID = randomID(6);
//         const newLayer = {
//             id: layerID,
//             type: layersType.SHAPE_LAYER,
//             properties: {
//                 ...defaultShapeValues,
//                 type: TOOL_NAME,
//                 x: circleRef.current.x,
//                 y: circleRef.current.y,
//                 radius: circleRef.current.radius,
//             },
//         };
//         const { x, y, w, h } = getCircleLayerBounds(newLayer.properties);
//         newLayer.layer = {
//             x,
//             y,
//             width: w,
//             height: h,
//         };
//         setDocumentState((prev) => ({
//             ...prev,
//             layers: [...prev.layers, newLayer],
//         }));
//         circleRef.current = { x: 0, y: 0, radius: 0 };
//     }, []);

//     useEffect(() => {
//         if (activeTool === null) {
//             documentCanvasRef.current.style.cursor = "";
//         }

//         if (activeTool === TOOL_NAME) {
//             documentCanvasRef.current.style.cursor = "crosshair";
//             documentCanvasRef.current.addEventListener(
//                 "mousedown",
//                 circleModeMouseDownHandler,
//             );
//             documentCanvasRef.current.addEventListener(
//                 "mousemove",
//                 circleModeMouseMoveHandler,
//             );
//             documentCanvasRef.current.addEventListener(
//                 "mouseup",
//                 circleModeMouseUpHandler,
//             );
//         } else {
//             documentCanvasRef.current.removeEventListener(
//                 "mousedown",
//                 circleModeMouseDownHandler,
//             );
//             documentCanvasRef.current.removeEventListener(
//                 "mousemove",
//                 circleModeMouseMoveHandler,
//             );
//             documentCanvasRef.current.removeEventListener(
//                 "mouseup",
//                 circleModeMouseUpHandler,
//             );
//         }
//     }, [activeTool]);

//     const circleButtonHandler = () => {
//         setActiveTool(activeTool === TOOL_NAME ? null : TOOL_NAME);
//     };

//     return (
//         <button
//             className={`button round ${activeTool === TOOL_NAME ? "active" : ""}`}
//             onClick={circleButtonHandler}
//         >
//             <PiCircle />
//         </button>
//     );
// }

// export default CircleButton;
