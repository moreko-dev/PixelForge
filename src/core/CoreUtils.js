export function generateProjectName(length = 6) {
    return `untitle-${Date.now()
        .toString()
        .slice(0 - length)}`;
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
