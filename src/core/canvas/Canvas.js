import { defaultCanvas } from "../CoreConstants.js";
import {
    checkNegativeValueOrThrow,
    checkValidStringOrThrow,
} from "../CoreValidation.js";

class Canvas {
    #width;
    #height;
    #backgroundColor;

    constructor({
        width = defaultCanvas.width,
        height = defaultCanvas.height,
        bgColor = defaultCanvas.bgColor,
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

    toJSON() {
        return {
            width: this.width,
            height: this.height,
            bgColor: this.backgroundColor,
        };
    }
}

export default Canvas;
