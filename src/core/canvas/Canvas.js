import { defaultCanvas } from "../CoreConstants.js";
import {
    checkNegativeValueOrThrow,
    checkValidStringOrThrow,
} from "../CoreValidation.js";

class Canvas {
    #width;
    #height;
    #backgroundColor;
    #scale;

    constructor({
        width = defaultCanvas.width,
        height = defaultCanvas.height,
        bgColor = defaultCanvas.bgColor,
        scale = defaultCanvas.scale,
    } = {}) {
        this.width = width;
        this.height = height;
        this.backgroundColor = bgColor;
    }

    set width(value) {
        checkNegativeValueOrThrow(value, "Canvas width");
        this.#width = value;
    }

    get width() {
        return this.#width;
    }

    set height(value) {
        checkNegativeValueOrThrow(value, "Canvas height");
        this.#height = value;
    }

    get height() {
        return this.#height;
    }

    set backgroundColor(value) {
        checkValidStringOrThrow(value, "Canvas bgColor");
        this.#backgroundColor = value;
    }

    get backgroundColor() {
        return this.#backgroundColor;
    }

    set scale(value) {
        checkNegativeValueOrThrow(value, "Canvas scale");
        this.#scale = value;
    }

    get scale() {
        return this.#scale;
    }

    static getCanvasBoundingBox(canvasRef) {
        const rect = canvasRef.getBoundingClientRect();
        let scaleX = canvasRef.width / rect.width;
        let scaleY = canvasRef.height / rect.height;
        return {
            x: rect.left * scaleX,
            y: rect.top * scaleY,
        };
    }
}

export default Canvas;
