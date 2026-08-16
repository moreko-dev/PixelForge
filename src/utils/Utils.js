export function checkJSONFileSchema(json) {
    if (!json.isDocumentCreated) return false;
    if (!json.documentName) return false;
    if (!json.canvas) return false;
    if (!json.layers) return false;
    return true;
}

export function downloadFile(href, download) {
    const link = document.createElement("a");
    link.href = href;
    link.download = download;
    link.click();
}

export function getMousePosition(canvas, mouseEvent) {
    const rect = canvas.getBoundingClientRect();
    let scaleX = canvas.width / rect.width;
    let scaleY = canvas.height / rect.height;
    return {
        x: (mouseEvent.clientX - rect.left) * scaleX,
        y: (mouseEvent.clientY - rect.top) * scaleY,
    };
}

export function getStartPointOfCanvas(canvas) {
    const rect = canvas.getBoundingClientRect();
    let scaleX = canvas.width / rect.width;
    let scaleY = canvas.height / rect.height;
    return {
        x: rect.left * scaleX,
        y: rect.top * scaleY,
    };
}

export function getRadius(sx, sy, cx, cy) {
    return Math.abs(cx >= cy ? sx - cx : sy - cy);
}

export function hitTest(
    elementX,
    elementY,
    elementWidth,
    elementHeight,
    mouseX,
    mouseY,
) {
    return (
        mouseX >= elementX &&
        mouseX <= elementX + elementWidth &&
        mouseY >= elementY &&
        mouseY <= elementY + elementHeight
    );
}

export function getLayerBounds(sx, sy, ex, ey) {
    const layerX = Math.min(sx, ex);
    const layerY = Math.min(sy, ey);
    const layerWidth = Math.abs(ex - sx);
    const layerHeight = Math.abs(ey - sy);
    return {
        x: layerX,
        y: layerY,
        w: layerWidth,
        h: layerHeight,
    };
}

export function getTextLayerBounds(canvas, layerProps) {
    const context = canvas.getContext("2d");
    context.font = `${layerProps.fontSize}px ${layerProps.fontFamily}`;
    const metrics = context.measureText(layerProps.value);
    let layerX, layerY, layerWidth, layerHeight;
    layerX = layerProps.x;
    layerY = layerProps.y;
    layerWidth = metrics.width;
    layerHeight =
        !metrics.actualBoundingBoxAscent || !metrics.actualBoundingBoxDescent
            ? metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
            : layerProps.fontSize * 1.2;

    return { x: layerX, y: layerY, w: layerWidth, h: layerHeight };
}

export function getCircleLayerBounds(layerProps) {
    let layerX, layerY, layerWidth, layerHeight;
    layerX = layerProps.x - layerProps.radius;
    layerY = layerProps.y - layerProps.radius;
    layerWidth = layerHeight = layerProps.radius * 2;
    return { x: layerX, y: layerY, w: layerWidth, h: layerHeight };
}

export function getDraggedPosition(deltaX, deltaY, elementX, elementY) {
    return {
        x: deltaX + elementX,
        y: deltaY + elementY,
    };
}

export function getRectTypeDraggedPosition(
    deltaX,
    deltaY,
    elementX,
    elementY,
    elementEX,
    elementEY,
) {
    return {
        x: deltaX + elementX,
        y: deltaY + elementY,
        ex: deltaX + elementEX,
        ey: deltaY + elementEY,
    };
}

export function checkProjectJsonSchema(json) {
    
}