import { useContext, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { DocumentContext } from "../../../../contexts/DocumentContext";
import {
    filtersObj,
    HANDLER_BORDER,
    layersType,
    shapeTypes,
} from "../../../../data/Constants";
import { deg2Rad } from "./../../../../utils/Functions";
import {
    getCircleLayerBounds,
    getDraggedPosition,
    getMousePosition,
    getRectTypeDraggedPosition,
    getStartPointOfCanvas,
    hitTest,
} from "./../../../../utils/Utils";
import "./DocumentViewContainer.css";

function DocumentViewContainer() {
    const {
        documentState,
        setDocumentState,
        documentCanvasRef,
        documentViewContainerRef,
        isDrawing,
        selectedLayerID,
        setSelectedLayerID,
    } = useContext(DocumentContext);
    const documentElementHandlerRef = useRef(null);
    const isDragging = useRef(false);
    const mouseStartPositionRef = useRef({ x: 0, y: 0 });
    const elementStartPositionRef = useRef({ x: 0, y: 0, ex: 0, ey: 0 });

    const isRectType = (layer) => {
        return (
            layer.type === layersType.SHAPE_LAYER &&
            [shapeTypes.LINE, shapeTypes.RECT].includes(layer.properties.type)
        );
    };

    const isCircleType = (layer) => {
        return (
            layer.type === layersType.SHAPE_LAYER &&
            layer.properties.type === shapeTypes.CIRCLE
        );
    };

    useEffect(() => {
        const canvasContext = documentCanvasRef.current.getContext("2d");
        const documentCanvas = documentState.canvas;
        const documentLayers = documentState.layers.slice();

        canvasContext.clearRect(
            0,
            0,
            documentCanvas.width,
            documentCanvas.height,
        );

        for (const layer of documentLayers) {
            canvasContext.save();

            // Reset shadows
            canvasContext.shadowColor = "#000000";
            canvasContext.shadowBlur = 0;
            canvasContext.shadowOffsetX = 0;
            canvasContext.shadowOffsetY = 0;

            // Reset filter
            canvasContext.filter = "";

            const layerType = layer.type;
            if (layerType === layersType.IMAGE_LAYER) {
                const imageProps = layer.properties;

                // Apply filters
                let filterString = "";
                for (const filter in imageProps.filter) {
                    if (!Object.hasOwn(imageProps.filter, filter)) continue;
                    let filterName = filter;
                    let filterValue = imageProps.filter[filter];
                    let filterUnit = filtersObj.find(
                        (filterObj) =>
                            filterObj.name.toLowerCase() === filterName,
                    ).unit;
                    filterString += `${filterName}(${filterValue}${filterUnit}) `;
                }
                canvasContext.filter = filterString;

                // Apply rotation
                const middleOfImageXAxis = imageProps.x + imageProps.width / 2;
                const middleOfImageYAxis = imageProps.y + imageProps.height / 2;
                canvasContext.translate(middleOfImageXAxis, middleOfImageYAxis);
                canvasContext.rotate(deg2Rad(imageProps.rotate || 0));
                canvasContext.scale(
                    imageProps.flipX ? -1 : 1,
                    imageProps.flipY ? -1 : 1,
                );

                // Render image
                canvasContext.drawImage(
                    imageProps.image,
                    -imageProps.width / 2,
                    -imageProps.height / 2,
                    imageProps.width,
                    imageProps.height,
                );
            } else if (layerType === layersType.TEXT_LAYER) {
                const textProps = layer.properties;

                // Apply shadows
                canvasContext.shadowColor = textProps.shadowColor;
                canvasContext.shadowBlur = textProps.shadowBlur;
                canvasContext.shadowOffsetX = textProps.shadowOffsetX;
                canvasContext.shadowOffsetY = textProps.shadowOffsetY;

                // Apply fonts
                canvasContext.font = `${textProps.fontSize}px ${textProps.fontFamily || "sans-serif"}`;
                canvasContext.fillStyle = textProps.fillStyle;

                // Apply aligns
                canvasContext.textAlign = "left";
                canvasContext.textBaseline = "top";

                // Render text
                canvasContext.fillText(
                    textProps.value,
                    textProps.x,
                    textProps.y,
                );
            } else if (layerType === layersType.BRUSH_LAYER) {
                const brushProperties = layer.properties;

                // Apply stroke style
                canvasContext.strokeStyle = brushProperties.strokeStyle;

                // Apply line settings
                canvasContext.lineWidth = brushProperties.lineWidth;
                canvasContext.lineCap = brushProperties.lineCap;
                canvasContext.lineJoin = brushProperties.lineJoin;
                canvasContext.miterLimit = brushProperties.miterLimit;

                // Render brush
                canvasContext.beginPath();
                brushProperties.points.forEach((point, index) => {
                    if (index === 0) {
                        canvasContext.moveTo(point.x, point.y);
                    }
                    canvasContext.lineTo(point.x, point.y);
                    canvasContext.stroke();
                });
                canvasContext.closePath();
            } else if (layerType === layersType.SHAPE_LAYER) {
                const shapeProperties = layer.properties;

                // Apply shadows
                canvasContext.shadowColor = shapeProperties.shadowColor;
                canvasContext.shadowBlur = shapeProperties.shadowBlur;
                canvasContext.shadowOffsetX = shapeProperties.shadowOffsetX;
                canvasContext.shadowOffsetY = shapeProperties.shadowOffsetY;

                // Apply style
                canvasContext.strokeStyle = shapeProperties.strokeStyle;
                canvasContext.fillStyle = shapeProperties.fillStyle;

                // Apply stroke width
                canvasContext.lineWidth = shapeProperties.lineWidth;

                if (shapeProperties.type === shapeTypes.RECT) {
                    // Render rect
                    canvasContext.fillRect(
                        shapeProperties.sx,
                        shapeProperties.sy,
                        shapeProperties.width,
                        shapeProperties.height,
                    );
                    canvasContext.strokeRect(
                        shapeProperties.sx,
                        shapeProperties.sy,
                        shapeProperties.width,
                        shapeProperties.height,
                    );
                } else if (shapeProperties.type === shapeTypes.LINE) {
                    // Render line
                    canvasContext.beginPath();
                    canvasContext.moveTo(
                        shapeProperties.sx,
                        shapeProperties.sy,
                    );
                    canvasContext.lineTo(
                        shapeProperties.ex,
                        shapeProperties.ey,
                    );
                    canvasContext.stroke();
                    canvasContext.closePath();
                } else if (shapeProperties.type === shapeTypes.CIRCLE) {
                    // Render circle
                    canvasContext.beginPath();
                    canvasContext.arc(
                        shapeProperties.x,
                        shapeProperties.y,
                        shapeProperties.radius,
                        0,
                        Math.PI * 2,
                    );
                    canvasContext.fill();
                    canvasContext.stroke();
                    canvasContext.closePath();
                } else {
                    toast.error(
                        `Unknown shape type! [${shapeProperties.type}]`,
                    );
                }
            } else {
                toast.error(`Unknown layer type! [${layer.id}: ${layerType}]`);
            }

            canvasContext.restore();
        }
    }, [documentState]);

    useEffect(() => {
        if (selectedLayerID) {
            const selectedLayer = documentState.layers.find(
                (item) => item.id === selectedLayerID,
            );
            const { x, y, width, height } = selectedLayer.layer;
            const canvasBounds = getStartPointOfCanvas(
                documentCanvasRef.current,
            );
            documentElementHandlerRef.current.style.top = `${canvasBounds.y + y - HANDLER_BORDER * 2}px`;
            documentElementHandlerRef.current.style.left = `${canvasBounds.x + x - HANDLER_BORDER * 2}px`;
            documentElementHandlerRef.current.style.width = `${width + HANDLER_BORDER}px`;
            documentElementHandlerRef.current.style.height = `${height + HANDLER_BORDER}px`;
            documentElementHandlerRef.current.style.scale =
                documentState.canvas.styles.scale ?? 1;
        }
    }, [selectedLayerID, documentState]);

    const canvasMouseDownHandler = (event) => {
        isDragging.current = true;
        const { x, y } = getMousePosition(documentCanvasRef.current, event);
        for (let i = documentState.layers.length - 1; i >= 0; i--) {
            const item = documentState.layers[i];
            if (item.type === layersType.BRUSH_LAYER) continue;
            const layerProps = item.properties;
            const layerBounds = item.layer;
            if (
                hitTest(
                    layerBounds.x,
                    layerBounds.y,
                    layerBounds.width,
                    layerBounds.height,
                    x,
                    y,
                )
            ) {
                setSelectedLayerID(item.id);
                [
                    mouseStartPositionRef.current.x,
                    mouseStartPositionRef.current.y,
                ] = [x, y];
                if (isRectType(item)) {
                    elementStartPositionRef.current.x = layerProps.sx;
                    elementStartPositionRef.current.y = layerProps.sy;
                    elementStartPositionRef.current.ex = layerProps.ex;
                    elementStartPositionRef.current.ey = layerProps.ey;
                } else {
                    [
                        elementStartPositionRef.current.x,
                        elementStartPositionRef.current.y,
                    ] = [layerProps.x, layerProps.y];
                }

                return;
            }
        }
        setSelectedLayerID(null);
    };

    const canvasMouseMoveHandler = (event) => {
        if (selectedLayerID && isDragging.current && !isDrawing.current) {
            const { x, y } = getMousePosition(documentCanvasRef.current, event);
            let selectedLayer = documentState.layers.find(
                (item) => item.id === selectedLayerID,
            );
            let draggedPosition, circleLayerBounds;
            if (isRectType(selectedLayer)) {
                draggedPosition = getRectTypeDraggedPosition(
                    x - mouseStartPositionRef.current.x,
                    y - mouseStartPositionRef.current.y,
                    elementStartPositionRef.current.x,
                    elementStartPositionRef.current.y,
                    elementStartPositionRef.current.ex,
                    elementStartPositionRef.current.ey,
                );
            } else {
                draggedPosition = getDraggedPosition(
                    x - mouseStartPositionRef.current.x,
                    y - mouseStartPositionRef.current.y,
                    elementStartPositionRef.current.x,
                    elementStartPositionRef.current.y,
                );
            }
            if (isCircleType(selectedLayer)) {
                circleLayerBounds = getCircleLayerBounds(
                    selectedLayer.properties,
                );
            }
            selectedLayer = {
                ...selectedLayer,
                properties: {
                    ...selectedLayer.properties,
                    ...(isRectType(selectedLayer)
                        ? {
                              sx: draggedPosition.x,
                              sy: draggedPosition.y,
                              ex: draggedPosition.ex,
                              ey: draggedPosition.ey,
                          }
                        : {
                              x: draggedPosition.x,
                              y: draggedPosition.y,
                          }),
                },
                layer: {
                    ...selectedLayer.layer,
                    x: isCircleType(selectedLayer)
                        ? circleLayerBounds.x
                        : draggedPosition.x,
                    y: isCircleType(selectedLayer)
                        ? circleLayerBounds.y
                        : draggedPosition.y,
                },
            };
            const layerArray = documentState.layers.slice();
            const layerIndex = layerArray.findIndex(
                (item) => item.id === selectedLayerID,
            );
            layerArray.splice(layerIndex, 1, selectedLayer);
            setDocumentState({
                ...documentState,
                layers: layerArray,
            });
        }
    };

    const canvasMouseUpHandler = () => {
        isDragging.current = false;
        mouseStartPositionRef.current = { x: 0, y: 0 };
        elementStartPositionRef.current = { x: 0, y: 0, ex: 0, ey: 0 };
    };

    return (
        <div className="document-view-container" ref={documentViewContainerRef}>
            <canvas
                id="canvas"
                className="document-view-canvas"
                width={documentState.canvas.width ?? 500}
                height={documentState.canvas.height ?? 500}
                style={documentState.canvas.styles ?? {}}
                ref={documentCanvasRef}
                onMouseDown={canvasMouseDownHandler}
                onMouseMove={canvasMouseMoveHandler}
                onMouseUp={canvasMouseUpHandler}
            ></canvas>
            <div
                className={`document-element-handler ${selectedLayerID ? "" : "hidden"}`}
                ref={documentElementHandlerRef}
            >
                <div className="element-handler top"></div>
                <div className="element-handler right"></div>
                <div className="element-handler bottom"></div>
                <div className="element-handler left"></div>
            </div>
        </div>
    );
}

export default DocumentViewContainer;
