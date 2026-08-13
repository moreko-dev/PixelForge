export function generateProjectName(length = 6) {
    return `untitle-${Date.now()
        .toString()
        .slice(0 - length)}`;
}

export function generateID(length = 6) {
    return Date.now()
        .toString()
        .slice(0 - length);
}

export function normalizeFileName(fileName, extention) {
    return fileName.endsWith(`.${extention}`)
        ? fileName
        : fileName.concat(`.${extention}`);
}

export function downloadFile(href, download) {
    const link = document.createElement("a");
    link.href = href;
    link.download = download;
    link.click();
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

export function getActualMousePosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    let scaleX = canvas.width / rect.width;
    let scaleY = canvas.height / rect.height;
    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY,
    };
}

export function calculateRadius(sx, sy, cx, cy) {
    return Math.abs(cx >= cy ? sx - cx : sy - cy);
}

export function deg2Rad(deg) {
    return deg * (Math.PI / 180);
}
