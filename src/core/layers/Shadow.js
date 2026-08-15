import {
    checkNegativeValueOrThrow,
    checkValidStringOrThrow,
} from "../CoreValidation.js";

class Shadow {
    #color;
    #blur;
    #offsetX;
    #offsetY;

    constructor(color, blur, offsetX, offsetY) {
        this.color = color || "#000000";
        this.blur = blur || 0;
        this.offsetX = offsetX || 0;
        this.offsetY = offsetY || 0;
    }

    set color(value) {
        checkValidStringOrThrow(value, "Shadow color");
        this.#color = value;
    }

    get color() {
        return this.#color;
    }

    set blur(value) {
        checkValidStringOrThrow(value, "Shadow blur");
        this.#blur = value;
    }

    get blur() {
        return this.#blur;
    }

    set offsetX(value) {
        checkNegativeValueOrThrow(value, "Shadow offsetX");
        this.#offsetX = value;
    }

    get offsetX() {
        return this.#offsetX;
    }

    set offsetY(value) {
        checkNegativeValueOrThrow(value, "Shadow offsetY");
        this.#offsetY = value;
    }

    reset() {
        this.color = "#000000";
        this.blur = 0;
        this.offsetX = 0;
        this.offsetY = 0;
    }
}

export default Shadow;
