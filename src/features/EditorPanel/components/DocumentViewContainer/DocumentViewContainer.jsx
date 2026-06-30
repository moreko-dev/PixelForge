import { useContext, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { DocumentContext } from "../../../../contexts/DocumentContext";
import { filtersObj, layersType, shapeTypes } from "../../../../data/Constants";
import { deg2Rad } from "./../../../../utils/Functions";
import { getMousePosition, hitTest } from "./../../../../utils/Utils";
import "./DocumentViewContainer.css";

function DocumentViewContainer() {
    const offsetRef = useRef({ x: 0, y: 0 });
    const {
        documentState,
        setDocumentState,
        documentCanvasRef,
        documentViewContainerRef,
        isDrawing,
    } = useContext(DocumentContext);

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
                        shapeProperties.x,
                        shapeProperties.y,
                        shapeProperties.width,
                        shapeProperties.height,
                    );
                    canvasContext.strokeRect(
                        shapeProperties.x,
                        shapeProperties.y,
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

    const canvasClickHandler = (event) => {
        const { x, y } = getMousePosition(documentCanvasRef.current, event);
        documentState.layers.forEach((item) => {
            const layerProps = item.properties;
            let layerX, layerY, layerWidth, layerHeight;

            if (item.type === layersType.IMAGE_LAYER) {
                layerX = layerProps.x;
                layerY = layerProps.y;
                layerWidth = layerProps.width;
                layerHeight = layerProps.height;
            } else if (item.type === layersType.TEXT_LAYER) {
                const context = documentCanvasRef.current.getContext("2d");
                context.font = `${layerProps.fontSize}px ${layerProps.fontFamily}`;
                const metrics = context.measureText(layerProps.value);
                layerX = layerProps.x;
                layerY = layerProps.y;
                layerWidth = metrics.width;
                layerHeight =
                    !metrics.actualBoundingBoxAscent ||
                    !metrics.actualBoundingBoxDescent
                        ? metrics.actualBoundingBoxAscent +
                          metrics.actualBoundingBoxDescent
                        : layerProps.fontSize * 1.2;
            } else if (item.type === layersType.SHAPE_LAYER) {
                if (layerProps.type === shapeTypes.RECT) {
                    layerX = layerProps.x;
                    layerY = layerProps.y;
                    layerWidth = layerProps.width;
                    layerHeight = layerProps.height;
                } else if (layerProps.type === shapeTypes.LINE) {
                    if (
                        layerProps.sy > layerProps.ey &&
                        layerProps.sx < layerProps.ex
                    ) {
                        layerX = layerProps.sx;
                        layerHeight = layerProps.sy - layerProps.ey;
                        layerY = layerProps.sy - layerHeight;
                        layerWidth =
                            layerProps.sx + (layerProps.ex - layerProps.sx);
                    } else if (
                        layerProps.sy > layerProps.ey &&
                        layerProps.sx > layerProps.ex
                    ) {
                        layerX = layerProps.ex;
                        layerY = layerProps.ey;
                        layerWidth =
                            layerProps.ex + (layerProps.sx - layerProps.ex);
                        layerHeight =
                            layerProps.ey + (layerProps.sy - layerProps.ey);
                    } else if (
                        layerProps.sx > layerProps.ex &&
                        layerProps.sy < layerProps.ey
                    ) {
                        layerX = layerProps.ex;
                        layerHeight = layerProps.ey - layerProps.sy;
                        layerY = layerProps.ey - layerHeight;
                        layerWidth =
                            layerProps.ex + (layerProps.sx - layerProps.ex);
                    } else {
                        layerX = layerProps.sx;
                        layerY = layerProps.sy;
                        layerWidth = layerProps.ex - layerProps.sx;
                        layerHeight = layerProps.ey - layerProps.sy;
                    }
                } else if (layerProps.type === shapeTypes.CIRCLE) {
                    layerX = layerProps.x - layerProps.radius;
                    layerY = layerProps.y - layerProps.radius;
                    layerWidth = layerHeight = layerProps.radius * 2;
                }
            } else return;

            if (hitTest(layerX, layerY, layerWidth, layerHeight, x, y)) {
                console.log(true);
            } else {
                console.error(false);
            }
        });
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
                onClick={canvasClickHandler}
            ></canvas>
        </div>
    );
}

export default DocumentViewContainer;
