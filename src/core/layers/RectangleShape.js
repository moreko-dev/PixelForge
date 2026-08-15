import { shapeType } from "../CoreConstants.js";
import { checkNegativeValueOrThrow } from "../CoreValidation.js";
import ShapeLayer from "./ShapeLayer.js";

class RectangleShape extends ShapeLayer {
    #shapeType;
    #x;
    #y;
    #width;
    #height;

    constructor(options = {}) {
        super({
            id: options.id,
            name: options.name,
            visible: options.visible,
            locked: options.locked,
            shadow: options.shadow,
            filter: options.filter,
        });
        this.#shapeType = shapeType.RECT;
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.width = options.width || 0;
        this.height = options.height || 0;
    }

    get shapeType() {
        return this.#shapeType;
    }

    set x(value) {
        checkNegativeValueOrThrow(value, "RectangleShape x");
        this.#x = value;
    }

    get x() {
        return this.#x;
    }

    set y(value) {
        checkNegativeValueOrThrow(value, "RectangleShape y");
        this.#y = value;
    }

    get y() {
        return this.#y;
    }

    set width(value) {
        checkNegativeValueOrThrow(value, "RectangleShape width");
        this.#width = value;
    }

    get width() {
        return this.#width;
    }

    set height(value) {
        checkNegativeValueOrThrow(value, "RectangleShape height");
        this.#height = value;
    }

    get height() {
        return this.#height;
    }
}

export default RectangleShape;
