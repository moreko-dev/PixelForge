import { useContext, useEffect, useRef } from "react";
import { DocumentContext } from "../../../../contexts/DocumentContext";
import { filtersObj, layersType, shapeTypes } from "../../../../data/Constants";
import { deg2Rad } from "./../../../../utils/Functions";
import "./DocumentViewContainer.css";

function DocumentViewContainer() {
    const draggedElementRef = useRef(null);
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
                }
            } else {
                toast.error(`Unknown layer type! [${layer.id}: ${layerType}]`);
            }

            canvasContext.restore();
        }
    }, [documentState]);

    return (
        <div className="document-view-container" ref={documentViewContainerRef}>
            <canvas
                id="canvas"
                className="document-view-canvas"
                width={documentState.canvas.width ?? 500}
                height={documentState.canvas.height ?? 500}
                style={documentState.canvas.styles ?? {}}
                ref={documentCanvasRef}
            ></canvas>
        </div>
    );
}

export default DocumentViewContainer;
