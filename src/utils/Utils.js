export function checkJSONFileSchema(json) {
    if (!json.isDocumentCreated) return false;
    if (!json.documentName) return false;
    if (!json.canvas) return false;
    if (!json.layers) return false;
    return true;
}

export function downloadFile(href, download) {
    console.log(href, download);

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
    let layerX, layerY, layerWidth, layerHeight;
    if (sy > ey && sx < ex) {
        layerX = sx;
        layerHeight = sy - ey;
        layerY = sy - layerHeight;
        layerWidth = sx + (ex - sx);
    } else if (sy > ey && sx > ex) {
        layerX = ex;
        layerY = ey;
        layerWidth = ex + (sx - ex);
        layerHeight = ey + (sy - ey);
    } else if (sx > ex && sy < ey) {
        layerX = ex;
        layerHeight = ey - sy;
        layerY = ey - layerHeight;
        layerWidth = ex + (sx - ex);
    } else {
        layerX = sx;
        layerY = sy;
        layerWidth = ex - sx;
        layerHeight = ey - sy;
    }
    return { x: layerX, y: layerY, w: layerWidth, h: layerHeight };
}
