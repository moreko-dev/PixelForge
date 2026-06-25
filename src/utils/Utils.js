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

export const getMousePosition = (canvas, mouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    let scaleX = canvas.width / rect.width;
    let scaleY = canvas.height / rect.height;
    return {
        x: (mouseEvent.clientX - rect.left) * scaleX,
        y: (mouseEvent.clientY - rect.top) * scaleY,
    };
};

export const getRadius = (sx, sy, cx, cy) => {
    return Math.abs(cx >= cy ? sx - cx : sy - cy);
};

export const hitTest = (
    elementX,
    elementY,
    elementWidth,
    elementHeight,
    mouseX,
    mouseY,
) => {
    return (
        mouseX >= elementX &&
        mouseX <= elementX + elementWidth &&
        mouseY >= elementY &&
        mouseY <= elementY + elementHeight
    );
};
