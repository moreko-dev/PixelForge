import { useContext, useEffect, useRef } from "react";
import { DocumentContext } from "../../../../contexts/DocumentContext";
import Canvas from "../../../../core/canvas/Canvas";
import Renderer from "../../../../core/canvas/Renderer";
import { layerType } from "../../../../core/CoreConstants";
import { getActualMousePosition, hitTest } from "../../../../core/CoreUtils";
import { HANDLER_BORDER } from "../../../../data/Constants";

function DocumentViewContainer() {
    const {
        projectState,
        projectCanvasRef,
        documentViewRef,
        selectionManager,
        forceUpdateProject,
        isDrawing,
    } = useContext(DocumentContext);
    const documentElementHandler = useRef(null);
    const isDragging = useRef(false);
    const mouseDragStartPosition = useRef({ x: 0, y: 0 });
    const isHandlerGrabbed = useRef(false);
    const grabbedHandler = useRef(null);

    useEffect(() => {
        Renderer.render(
            projectCanvasRef.current,
            projectState.canvas,
            projectState.layers,
        );
    }, [projectState]);

    useEffect(() => {
        if (selectionManager.selectedItem) {
            const selectedLayer = projectState.layers.find(
                (l) => l.id === selectionManager.selectedItem,
            );
            const { x, y, width, height } = selectedLayer.boundingBox;
            const canvasBounds = Canvas.getCanvasBoundingBox(
                projectCanvasRef.current,
            );
            documentElementHandler.current.style.top = `${canvasBounds.y + y - HANDLER_BORDER * 2}px`;
            documentElementHandler.current.style.left = `${canvasBounds.x + x - HANDLER_BORDER * 2}px`;
            documentElementHandler.current.style.width = `${width + HANDLER_BORDER}px`;
            documentElementHandler.current.style.height = `${height + HANDLER_BORDER}px`;
            documentElementHandler.current.style.scale =
                projectCanvasRef.current.style.scale ?? 1;
        }
    }, [selectionManager, projectState]);

    const canvasMouseDownHandler = (event) => {
        isDragging.current = true;
        const { x: mouseX, y: mouseY } = getActualMousePosition(
            projectCanvasRef.current,
            event,
        );
        for (let i = projectState.layers.length - 1; i >= 0; i--) {
            const layer = projectState.layers[i];
            if (layer.type === layerType.PEN_LAYER) continue;
            const layerBounds = layer.boundingBox;
            if (
                hitTest(
                    layerBounds.x,
                    layerBounds.y,
                    layerBounds.width,
                    layerBounds.height,
                    mouseX,
                    mouseY,
                )
            ) {
                selectionManager.selectedItem = layer.id;
                [
                    mouseDragStartPosition.current.x,
                    mouseDragStartPosition.current.y,
                ] = [mouseX, mouseY];
                return;
            }
        }
        selectionManager.selectedItem = null;
        grabbedHandler.current = null;
    };

    const canvasMouseMoveHandler = (event) => {
        const mouseDragCurrentPosition = getActualMousePosition(
            projectCanvasRef.current,
            event,
        );
        if (selectionManager.selectedItem && !isDrawing) {
            if (isHandlerGrabbed.current) {
                const selectedLayer = projectState.layers.find(
                    (l) => l.id === selectionManager.selectedItem,
                );
                selectedLayer.resize(
                    grabbedHandler.current,
                    mouseDragStartPosition.current,
                    mouseDragCurrentPosition,
                );
                if (selectedLayer.type === layerType.TEXT_LAYER) {
                    selectedLayer.updateDimensions(projectCanvasRef.current);
                }
                selectedLayer.boundingBox.update(selectedLayer.getBounds());
            } else if (isDragging.current) {
                const selectedLayer = projectState.layers.find(
                    (l) => l.id === selectionManager.selectedItem,
                );
                // if any problem occurs while moving,
                // save the element position in mouseDown
                selectedLayer.move(
                    mouseDragStartPosition,
                    mouseDragCurrentPosition,
                );
                selectedLayer.boundingBox.update(selectedLayer.getBounds());
            }
        }
    };

    const canvasMouseUpHandler = () => {
        isHandlerGrabbed.current = false;
        grabbedHandler.current = null;
        isDragging.current = false;
        mouseDragStartPosition.current = { x: 0, y: 0 };
    };

    const handlerMouseDownHandler = (event) => {
        isHandlerGrabbed.current = true;
        grabbedHandler.current = event.target.dataset.name;
    };

    return (
        <div className="document-view-container" ref={documentViewRef}>
            <canvas
                id="canvas"
                className="document-view-canvas"
                width={projectState.canvas.width}
                height={projectState.canvas.height}
                style={{
                    backgroundColor: projectState.canvas.backgroundColor,
                    scale: projectState.canvas.scale,
                    border: "1px solid #000000",
                }}
                ref={projectCanvasRef}
                onMouseDown={canvasMouseDownHandler}
                onMouseMove={canvasMouseMoveHandler}
                onMouseUp={canvasMouseUpHandler}
            ></canvas>
            <div
                className={`document-element-handler ${selectionManager.selectedItem ? "" : "hidden"}`}
                ref={documentElementHandler}
            >
                {[layerType.PEN_LAYER].includes(
                    projectState.layers.find(
                        (l) => l.id === selectionManager.selectedItem,
                    ).type,
                ) && (
                    <>
                        <div
                            className="element-handler right"
                            data-name="right"
                            onMouseDown={handlerMouseDownHandler}
                        ></div>
                        <div
                            className="element-handler bottom"
                            data-name="bottom"
                            onMouseDown={handlerMouseDownHandler}
                        ></div>
                    </>
                )}
            </div>
        </div>
    );
}

// import { useContext, useEffect, useRef } from "react";
// import toast from "react-hot-toast";
// import { DocumentContext } from "../../../../contexts/DocumentContext";
// import {
//     filtersObj,
//     HANDLER_BORDER,
//     layersType,
//     shapeTypes,
// } from "../../../../data/Constants";
// import { deg2Rad } from "./../../../../utils/Functions";
// import {
//     getCircleLayerBounds,
//     getDraggedPosition,
//     getMousePosition,
//     getRectTypeDraggedPosition,
//     getStartPointOfCanvas,
//     getTextLayerBounds,
//     hitTest,
// } from "./../../../../utils/Utils";
// import "./DocumentViewContainer.css";

// function DocumentViewContainer() {
//     const {
//         documentState,
//         setDocumentState,
//         documentCanvasRef,
//         documentViewContainerRef,
//         isDrawing,
//         selectedLayerID,
//         setSelectedLayerID,
//     } = useContext(DocumentContext);
//     const documentElementHandlerRef = useRef(null);
//     const isDragging = useRef(false);
//     const mouseStartPositionRef = useRef({ x: 0, y: 0 });
//     const elementStartPositionRef = useRef({ x: 0, y: 0, ex: 0, ey: 0 });
//     const isHandlerGrabbed = useRef(false);
//     const grabbedHandler = useRef(null);
//     const mouseGrabbedPositionRef = useRef({ x: 0, y: 0, cw: 0, ch: 0 });
//     const currentSelectedLayer = documentState.layers.find(
//         (item) => item.id === selectedLayerID,
//     );
//     const rectEndPositionRef = useRef({ ex: 0, ey: 0 });

//     const isRectType = (layer) => {
//         return (
//             layer.type === layersType.SHAPE_LAYER &&
//             [shapeTypes.LINE, shapeTypes.RECT].includes(layer.properties.type)
//         );
//     };

//     const isCircleType = (layer) => {
//         return (
//             layer.type === layersType.SHAPE_LAYER &&
//             layer.properties.type === shapeTypes.CIRCLE
//         );
//     };

//     useEffect(() => {
//         const canvasContext = documentCanvasRef.current.getContext("2d");
//         const documentCanvas = documentState.canvas;
//         const documentLayers = documentState.layers.slice();

//         canvasContext.clearRect(
//             0,
//             0,
//             documentCanvas.width,
//             documentCanvas.height,
//         );

//         for (const layer of documentLayers) {
//             canvasContext.save();

//             // Reset shadows
//             canvasContext.shadowColor = "#000000";
//             canvasContext.shadowBlur = 0;
//             canvasContext.shadowOffsetX = 0;
//             canvasContext.shadowOffsetY = 0;

//             // Reset filter
//             canvasContext.filter = "";

//             const layerType = layer.type;
//             if (layerType === layersType.IMAGE_LAYER) {
//                 const imageProps = layer.properties;

//                 // Apply filters
//                 let filterString = "";
//                 for (const filter in imageProps.filter) {
//                     if (!Object.hasOwn(imageProps.filter, filter)) continue;
//                     let filterName = filter;
//                     let filterValue = imageProps.filter[filter];
//                     let filterUnit = filtersObj.find(
//                         (filterObj) =>
//                             filterObj.name.toLowerCase() === filterName,
//                     ).unit;
//                     filterString += `${filterName}(${filterValue}${filterUnit}) `;
//                 }
//                 canvasContext.filter = filterString;

//                 // Apply rotation
//                 const middleOfImageXAxis = imageProps.x + imageProps.width / 2;
//                 const middleOfImageYAxis = imageProps.y + imageProps.height / 2;
//                 canvasContext.translate(middleOfImageXAxis, middleOfImageYAxis);
//                 canvasContext.rotate(deg2Rad(imageProps.rotate || 0));
//                 canvasContext.scale(
//                     imageProps.flipX ? -1 : 1,
//                     imageProps.flipY ? -1 : 1,
//                 );

//                 // Render image
//                 canvasContext.drawImage(
//                     imageProps.image,
//                     -imageProps.width / 2,
//                     -imageProps.height / 2,
//                     imageProps.width,
//                     imageProps.height,
//                 );
//             } else if (layerType === layersType.TEXT_LAYER) {
//                 const textProps = layer.properties;

//                 // Apply shadows
//                 canvasContext.shadowColor = textProps.shadowColor;
//                 canvasContext.shadowBlur = textProps.shadowBlur;
//                 canvasContext.shadowOffsetX = textProps.shadowOffsetX;
//                 canvasContext.shadowOffsetY = textProps.shadowOffsetY;

//                 // Apply fonts
//                 canvasContext.font = `${textProps.fontSize}px ${textProps.fontFamily || "sans-serif"}`;
//                 canvasContext.fillStyle = textProps.fillStyle;

//                 // Apply aligns
//                 canvasContext.textAlign = "left";
//                 canvasContext.textBaseline = "top";

//                 // Render text
//                 canvasContext.fillText(
//                     textProps.value,
//                     textProps.x,
//                     textProps.y,
//                 );
//             } else if (layerType === layersType.BRUSH_LAYER) {
//                 const brushProperties = layer.properties;

//                 // Apply stroke style
//                 canvasContext.strokeStyle = brushProperties.strokeStyle;

//                 // Apply line settings
//                 canvasContext.lineWidth = brushProperties.lineWidth;
//                 canvasContext.lineCap = brushProperties.lineCap;
//                 canvasContext.lineJoin = brushProperties.lineJoin;
//                 canvasContext.miterLimit = brushProperties.miterLimit;

//                 // Render brush
//                 canvasContext.beginPath();
//                 brushProperties.points.forEach((point, index) => {
//                     if (index === 0) {
//                         canvasContext.moveTo(point.x, point.y);
//                     }
//                     canvasContext.lineTo(point.x, point.y);
//                     canvasContext.stroke();
//                 });
//                 canvasContext.closePath();
//             } else if (layerType === layersType.SHAPE_LAYER) {
//                 const shapeProperties = layer.properties;

//                 // Apply shadows
//                 canvasContext.shadowColor = shapeProperties.shadowColor;
//                 canvasContext.shadowBlur = shapeProperties.shadowBlur;
//                 canvasContext.shadowOffsetX = shapeProperties.shadowOffsetX;
//                 canvasContext.shadowOffsetY = shapeProperties.shadowOffsetY;

//                 // Apply style
//                 canvasContext.strokeStyle = shapeProperties.strokeStyle;
//                 canvasContext.fillStyle = shapeProperties.fillStyle;

//                 // Apply stroke width
//                 canvasContext.lineWidth = shapeProperties.lineWidth;

//                 if (shapeProperties.type === shapeTypes.RECT) {
//                     // Render rect
//                     canvasContext.fillRect(
//                         shapeProperties.sx,
//                         shapeProperties.sy,
//                         shapeProperties.width,
//                         shapeProperties.height,
//                     );
//                     canvasContext.strokeRect(
//                         shapeProperties.sx,
//                         shapeProperties.sy,
//                         shapeProperties.width,
//                         shapeProperties.height,
//                     );
//                 } else if (shapeProperties.type === shapeTypes.LINE) {
//                     // Render line
//                     canvasContext.beginPath();
//                     canvasContext.moveTo(
//                         shapeProperties.sx,
//                         shapeProperties.sy,
//                     );
//                     canvasContext.lineTo(
//                         shapeProperties.ex,
//                         shapeProperties.ey,
//                     );
//                     canvasContext.stroke();
//                     canvasContext.closePath();
//                 } else if (shapeProperties.type === shapeTypes.CIRCLE) {
//                     // Render circle
//                     canvasContext.beginPath();
//                     canvasContext.arc(
//                         shapeProperties.x,
//                         shapeProperties.y,
//                         shapeProperties.radius,
//                         0,
//                         Math.PI * 2,
//                     );
//                     canvasContext.fill();
//                     canvasContext.stroke();
//                     canvasContext.closePath();
//                 } else {
//                     toast.error(
//                         `Unknown shape type! [${shapeProperties.type}]`,
//                     );
//                 }
//             } else {
//                 toast.error(`Unknown layer type! [${layer.id}: ${layerType}]`);
//             }

//             canvasContext.restore();
//         }
//     }, [documentState]);

//     useEffect(() => {
//         if (selectedLayerID) {
//             const selectedLayer = documentState.layers.find(
//                 (item) => item.id === selectedLayerID,
//             );
//             const { x, y, width, height } = selectedLayer.layer;
//             const canvasBounds = getStartPointOfCanvas(
//                 documentCanvasRef.current,
//             );
//             documentElementHandlerRef.current.style.top = `${canvasBounds.y + y - HANDLER_BORDER * 2}px`;
//             documentElementHandlerRef.current.style.left = `${canvasBounds.x + x - HANDLER_BORDER * 2}px`;
//             documentElementHandlerRef.current.style.width = `${width + HANDLER_BORDER}px`;
//             documentElementHandlerRef.current.style.height = `${height + HANDLER_BORDER}px`;
//             documentElementHandlerRef.current.style.scale =
//                 documentState.canvas.styles.scale ?? 1;
//         }
//     }, [selectedLayerID, documentState]);

//     const canvasMouseDownHandler = (event) => {
//         isDragging.current = true;
//         const { x, y } = getMousePosition(documentCanvasRef.current, event);
//         for (let i = documentState.layers.length - 1; i >= 0; i--) {
//             const item = documentState.layers[i];
//             if (item.type === layersType.BRUSH_LAYER) continue;
//             const layerProps = item.properties;
//             const layerBounds = item.layer;
//             if (
//                 hitTest(
//                     layerBounds.x,
//                     layerBounds.y,
//                     layerBounds.width,
//                     layerBounds.height,
//                     x,
//                     y,
//                 )
//             ) {
//                 setSelectedLayerID(item.id);
//                 [
//                     mouseStartPositionRef.current.x,
//                     mouseStartPositionRef.current.y,
//                 ] = [x, y];
//                 if (isRectType(item)) {
//                     elementStartPositionRef.current.x = layerProps.sx;
//                     elementStartPositionRef.current.y = layerProps.sy;
//                     elementStartPositionRef.current.ex = layerProps.ex;
//                     elementStartPositionRef.current.ey = layerProps.ey;
//                 } else {
//                     [
//                         elementStartPositionRef.current.x,
//                         elementStartPositionRef.current.y,
//                     ] = [layerProps.x, layerProps.y];
//                 }

//                 return;
//             }
//         }
//         setSelectedLayerID(null);
//         grabbedHandler.current = null;
//     };

//     const canvasMouseMoveHandler = (event) => {
//         if (selectedLayerID && isHandlerGrabbed.current && !isDrawing.current) {
//             const { x: cx, y: cy } = getMousePosition(
//                 documentCanvasRef.current,
//                 event,
//             );
//             let selectedLayer = documentState.layers.find(
//                 (item) => item.id === selectedLayerID,
//             );
//             let diff;
//             if (grabbedHandler.current === "right") {
//                 if (selectedLayer.type === layersType.IMAGE_LAYER) {
//                     diff = cx - mouseGrabbedPositionRef.current.x;
//                     selectedLayer = {
//                         ...selectedLayer,
//                         properties: {
//                             ...selectedLayer.properties,
//                             width: mouseGrabbedPositionRef.current.cw + diff,
//                         },
//                         layer: {
//                             ...selectedLayer.layer,
//                             width: mouseGrabbedPositionRef.current.cw + diff,
//                         },
//                     };
//                 } else if (selectedLayer.type === layersType.TEXT_LAYER) {
//                     let scale =
//                         selectedLayer.properties.fontSize /
//                         selectedLayer.layer.width;
//                     diff = cx - mouseGrabbedPositionRef.current.x;
//                     selectedLayer = {
//                         ...selectedLayer,
//                         properties: {
//                             ...selectedLayer.properties,
//                             fontSize:
//                                 (mouseGrabbedPositionRef.current.cw + diff) *
//                                 scale,
//                         },
//                     };
//                     const {
//                         x: tx,
//                         y: ty,
//                         w: tw,
//                         h: th,
//                     } = getTextLayerBounds(
//                         documentCanvasRef.current,
//                         selectedLayer.properties,
//                     );
//                     selectedLayer = {
//                         ...selectedLayer,
//                         layer: {
//                             x: tx,
//                             y: ty,
//                             width: tw,
//                             height: th,
//                         },
//                     };
//                 } else if (selectedLayer.type === layersType.SHAPE_LAYER) {
//                     const shapeType = selectedLayer.properties.type;
//                     if (shapeType === shapeTypes.RECT) {
//                         diff = cx - mouseGrabbedPositionRef.current.x;
//                         selectedLayer = {
//                             ...selectedLayer,
//                             properties: {
//                                 ...selectedLayer.properties,
//                                 width:
//                                     mouseGrabbedPositionRef.current.cw + diff,
//                                 ex: rectEndPositionRef.current.ex + diff,
//                             },
//                             layer: {
//                                 ...selectedLayer.layer,
//                                 width:
//                                     mouseGrabbedPositionRef.current.cw + diff,
//                             },
//                         };
//                     }
//                 }
//             } else if (grabbedHandler.current === "bottom") {
//                 if (selectedLayer.type === layersType.IMAGE_LAYER) {
//                     diff = cy - mouseGrabbedPositionRef.current.y;
//                     selectedLayer = {
//                         ...selectedLayer,
//                         properties: {
//                             ...selectedLayer.properties,
//                             height: mouseGrabbedPositionRef.current.ch + diff,
//                         },
//                         layer: {
//                             ...selectedLayer.layer,
//                             height: mouseGrabbedPositionRef.current.ch + diff,
//                         },
//                     };
//                 } else if (selectedLayer.type === layersType.SHAPE_LAYER) {
//                     const shapeType = selectedLayer.properties.type;
//                     if (shapeType === shapeTypes.RECT) {
//                         diff = cy - mouseGrabbedPositionRef.current.y;
//                         selectedLayer = {
//                             ...selectedLayer,
//                             properties: {
//                                 ...selectedLayer.properties,
//                                 height:
//                                     mouseGrabbedPositionRef.current.ch + diff,
//                                 ey: rectEndPositionRef.current.ey + diff,
//                             },
//                             layer: {
//                                 ...selectedLayer.layer,
//                                 height:
//                                     mouseGrabbedPositionRef.current.ch + diff,
//                             },
//                         };
//                     }
//                 }
//             }
//             const layerArray = documentState.layers.slice();
//             const layerIndex = layerArray.findIndex(
//                 (item) => item.id === selectedLayerID,
//             );
//             layerArray.splice(layerIndex, 1, selectedLayer);
//             setDocumentState({
//                 ...documentState,
//                 layers: layerArray,
//             });
//         } else if (
//             selectedLayerID &&
//             isDragging.current &&
//             !isDrawing.current
//         ) {
//             const { x, y } = getMousePosition(documentCanvasRef.current, event);
//             let selectedLayer = documentState.layers.find(
//                 (item) => item.id === selectedLayerID,
//             );
//             let draggedPosition, circleLayerBounds;
//             if (isRectType(selectedLayer)) {
//                 draggedPosition = getRectTypeDraggedPosition(
//                     x - mouseStartPositionRef.current.x,
//                     y - mouseStartPositionRef.current.y,
//                     elementStartPositionRef.current.x,
//                     elementStartPositionRef.current.y,
//                     elementStartPositionRef.current.ex,
//                     elementStartPositionRef.current.ey,
//                 );
//             } else {
//                 draggedPosition = getDraggedPosition(
//                     x - mouseStartPositionRef.current.x,
//                     y - mouseStartPositionRef.current.y,
//                     elementStartPositionRef.current.x,
//                     elementStartPositionRef.current.y,
//                 );
//             }
//             if (isCircleType(selectedLayer)) {
//                 circleLayerBounds = getCircleLayerBounds(
//                     selectedLayer.properties,
//                 );
//             }
//             selectedLayer = {
//                 ...selectedLayer,
//                 properties: {
//                     ...selectedLayer.properties,
//                     ...(isRectType(selectedLayer)
//                         ? {
//                               sx: draggedPosition.x,
//                               sy: draggedPosition.y,
//                               ex: draggedPosition.ex,
//                               ey: draggedPosition.ey,
//                           }
//                         : {
//                               x: draggedPosition.x,
//                               y: draggedPosition.y,
//                           }),
//                 },
//                 layer: {
//                     ...selectedLayer.layer,
//                     x: isCircleType(selectedLayer)
//                         ? circleLayerBounds.x
//                         : draggedPosition.x,
//                     y: isCircleType(selectedLayer)
//                         ? circleLayerBounds.y
//                         : draggedPosition.y,
//                 },
//             };
//             const layerArray = documentState.layers.slice();
//             const layerIndex = layerArray.findIndex(
//                 (item) => item.id === selectedLayerID,
//             );
//             layerArray.splice(layerIndex, 1, selectedLayer);
//             setDocumentState({
//                 ...documentState,
//                 layers: layerArray,
//             });
//         }
//     };

//     const canvasMouseUpHandler = () => {
//         if (isHandlerGrabbed.current) isHandlerGrabbed.current = false;
//         isDragging.current = false;
//         mouseStartPositionRef.current = { x: 0, y: 0 };
//         elementStartPositionRef.current = { x: 0, y: 0, ex: 0, ey: 0 };
//     };

//     const handlerMouseDownHandler = (event) => {
//         isHandlerGrabbed.current = true;
//         grabbedHandler.current = event.target.dataset.name;
//         const { x, y } = getMousePosition(documentCanvasRef.current, event);
//         const selectedLayer = documentState.layers.find(
//             (item) => item.id === selectedLayerID,
//         );
//         [
//             mouseGrabbedPositionRef.current.x,
//             mouseGrabbedPositionRef.current.y,
//             mouseGrabbedPositionRef.current.cw,
//             mouseGrabbedPositionRef.current.ch,
//         ] = [
//             x,
//             y,
//             selectedLayer[
//                 selectedLayer.type === layersType.TEXT_LAYER
//                     ? "layer"
//                     : "properties"
//             ].width,
//             selectedLayer[
//                 selectedLayer.type === layersType.TEXT_LAYER
//                     ? "layer"
//                     : "properties"
//             ].height,
//         ];
//         if (selectedLayer.properties?.type === shapeTypes.RECT) {
//             [rectEndPositionRef.current.ex, rectEndPositionRef.current.ey] = [
//                 selectedLayer.properties.ex,
//                 selectedLayer.properties.ey,
//             ];
//         }
//     };

//     const handlerMouseUpHandler = () => {
//         isHandlerGrabbed.current = false;
//     };

//     return (
//         <div className="document-view-container" ref={documentViewContainerRef}>
//             <canvas
//                 id="canvas"
//                 className="document-view-canvas"
//                 width={documentState.canvas.width ?? 500}
//                 height={documentState.canvas.height ?? 500}
//                 style={documentState.canvas.styles ?? {}}
//                 ref={documentCanvasRef}
//                 onMouseDown={canvasMouseDownHandler}
//                 onMouseMove={canvasMouseMoveHandler}
//                 onMouseUp={canvasMouseUpHandler}
//             ></canvas>
//             <div
//                 className={`document-element-handler ${selectedLayerID ? "" : "hidden"}`}
//                 ref={documentElementHandlerRef}
//             >
//                 {![shapeTypes.LINE, shapeTypes.CIRCLE].includes(
//                     currentSelectedLayer?.properties?.type,
//                 ) && (
//                     <>
//                         <div
//                             className="element-handler right"
//                             data-name="right"
//                             onMouseDown={handlerMouseDownHandler}
//                             onMouseUp={handlerMouseUpHandler}
//                         ></div>
//                         {currentSelectedLayer?.type !==
//                             layersType.TEXT_LAYER && (
//                             <div
//                                 className="element-handler bottom"
//                                 data-name="bottom"
//                                 onMouseDown={handlerMouseDownHandler}
//                                 onMouseUp={handlerMouseUpHandler}
//                             ></div>
//                         )}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default DocumentViewContainer;
