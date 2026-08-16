import Canvas from "../canvas/Canvas.js";
import { defaultCanvas } from "../CoreConstants.js";
import {
    downloadFile,
    generateProjectName,
    normalizeFileName,
} from "../CoreUtils.js";
import {
    checkInstanceOfOrThrow,
    checkTypeOfOrThrow,
    checkValidStringOrThrow,
} from "../CoreValidation.js";

class Project {
    #isProjectCreated;
    #name;
    #canvas;
    #layers;

    constructor({
        isProjectCreated = false,
        name = generateProjectName(),
        canvas = new Canvas(),
        layers = [],
    } = {}) {
        this.isProjectCreated = isProjectCreated;
        this.name = name;
        this.canvas = canvas;
        this.layers = layers;
    }

    set isProjectCreated(value) {
        checkTypeOfOrThrow(value, "boolean", "Project isProjectCreated");
        this.#isProjectCreated = value;
    }

    get isProjectCreated() {
        return this.#isProjectCreated;
    }

    set name(value) {
        checkValidStringOrThrow(value, "Project name");
        this.#name = value;
    }

    get name() {
        return this.#name;
    }

    set canvas(value) {
        checkInstanceOfOrThrow(value, Canvas, "Project canvas");
        this.#canvas = value;
    }

    get canvas() {
        return this.#canvas;
    }

    set layers(value) {
        checkInstanceOfOrThrow(value, Array, "Project layers");
        this.#layers = value;
    }

    get layers() {
        return this.#layers;
    }

    save(fileName = this.name) {
        checkValidStringOrThrow(fileName, "Project save() - file-name");
        this.name = fileName;
        fileName = normalizeFileName(fileName, "json");
        let projectJson = JSON.stringify(this, null, 2);
        // Download
        const blob = new Blob([projectJson], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        downloadFile(url, fileName);
        return true;
    }

    download(canvasRef, fileName, pictureType) {
        const tempImage = new Image();
        tempImage.src = canvasRef.toDataURL();
        tempImage.onload = () => {
            const context = canvasRef.getContext("2d");
            context.globalCompositeOperation = "destination-over";
            context.fillStyle = this.canvas.backgroundColor || "#ffffff";
            context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            // Download
            const url = canvasRef.toDataURL(`image/${pictureType}`);
            fileName = normalizeFileName(fileName, pictureType);
            downloadFile(url, fileName);
            // Restore canvas
            context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            context.drawImage(tempImage, 0, 0);
            return true;
        };
    }

    home() {
        this.isProjectCreated = false;
        this.name = generateProjectName(6);
        this.canvas.width = defaultCanvas.width;
        this.canvas.height = defaultCanvas.height;
        this.canvas.backgroundColor = defaultCanvas.bgColor;
        this.layers = [];
    }
}

export default Project;
