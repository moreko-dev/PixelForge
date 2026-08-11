/*
Canvas class stores the canvas's properties and methods
*/

class Canvas {
    #width;
    #height;
    #backgroundColor;

    constructor(width, height, bgColor) {
        this.width = width;
        this.height = height;
        this.backgroundColor = bgColor;
    }

    set width(value) {
        if (value < 0) {
            throw new Error("Canvas width cannot be negative");
        }
        this.#width = value;
    }

    get width() {
        return this.#width;
    }

    set height(value) {
        if (value < 0) {
            throw new Error("Canvas height cannot be negative");
        }
        this.#height = value;
    }

    get height() {
        return this.#height;
    }

    set backgroundColor(value) {
        if (!String(value).trim()) {
            throw new Error(
                `Canvas bgColor should have a valid value -> [${value}]`,
            );
        }
        this.#backgroundColor = value;
    }

    get backgroundColor() {
        return this.#backgroundColor;
    }
}

export default Canvas;
