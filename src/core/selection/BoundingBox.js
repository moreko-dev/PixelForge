import { checkNegativeValueOrThrow } from "../CoreValidation.js";

class BoundingBox {
    #x;
    #y;
    #width;
    #height;

    constructor(options = {}) {
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.width = options.width || 0;
        this.height = options.height || 0;
    }

    set x(value) {
        checkNegativeValueOrThrow(value, "BoundingBox x");
        this.#x = value;
    }

    get x() {
        return this.#x;
    }

    set y(value) {
        checkNegativeValueOrThrow(value, "BoundingBox y");
        this.#y = value;
    }

    get y() {
        return this.#y;
    }

    set width(value) {
        checkNegativeValueOrThrow(value, "BoundingBox width");
        this.#width = value;
    }

    get width() {
        return this.#width;
    }

    set height(value) {
        checkNegativeValueOrThrow(value, "BoundingBox height");
        this.#height = value;
    }

    get height() {
        return this.#height;
    }

    update(options) {
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.width = options.width || 0;
        this.height = options.height || 0;
    }
}

export default BoundingBox;
