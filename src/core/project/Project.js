import Canvas from "../canvas/Canvas.js";
import { defaultCanvas } from "../CoreConstants.js";
import {
    downloadFile,
    generateProjectName,
    normalizeFileName,
} from "../CoreUtils";

class Project {
    #isProjectCreated;
    #name;
    #canvas;
    #layers;

    constructor(options = {}) {
        this.isProjectCreated = options?.isProjectCreated ?? false;
        this.name = options?.name ?? generateProjectName(6);
        this.canvas =
            options?.canvas ??
            new Canvas(
                defaultCanvas.width,
                defaultCanvas.height,
                defaultCanvas.bgColor,
            );
        this.layers = options?.layers ?? [];
    }

    set isProjectCreated(value) {
        if (typeof value !== "boolean") {
            throw new Error(
                "Project isProjectCreated should have a boolean value",
            );
        }
        this.#isProjectCreated = value;
    }

    get isProjectCreated() {
        return this.#isProjectCreated;
    }

    set name(value) {
        if (!String(value).trim()) {
            throw new Error(`Project name is not valid -> [${value}]`);
        }
        this.#name = value;
    }

    get name() {
        return this.#name;
    }

    set canvas(value) {
        if (!(value instanceof Canvas)) {
            throw new Error(
                `Project canvas is not a valid object -> [${value}]`,
            );
        }
        this.#canvas = value;
    }

    get canvas() {
        return this.#canvas;
    }

    set layers(value) {
        if (!Array.isArray(value)) {
            throw new Error(`Project layers is not valid -> [${value}]`);
        }
        this.#layers = value;
    }

    get layers() {
        return this.#layers;
    }

    save(fileName = this.name) {
        if (!String(fileName).trim()) {
            throw new Error(
                `Project save()->name is not valid -> [${fileName}}`,
            );
        }
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

    toJSON() {
        return {
            isProjectCreated: this.isProjectCreated,
            name: this.name,
            canvas: this.canvas,
            layers: this.layers,
        };
    }
}

export default Project;
