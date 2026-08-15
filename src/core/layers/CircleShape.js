import { resizeType, shapeType } from "../CoreConstants.js";
import { checkNegativeValueOrThrow } from "../CoreValidation.js";
import ShapeLayer from "./ShapeLayer.js";

class CircleShape extends ShapeLayer {
    #shapeType;
    #x;
    #y;
    #radius;

    constructor(options = {}) {
        super({
            id: options.id,
            name: options.name,
            visible: options.visible,
            locked: options.locked,
            shadow: options.shadow,
            filter: options.filter,
        });
        this.#shapeType = shapeType.CIRCLE;
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.radius = options.radius || 0;
    }

    get shapeType() {
        return this.#shapeType;
    }

    set x(value) {
        checkNegativeValueOrThrow(value, "CircleShape x");
        this.#x = value;
    }

    get x() {
        return this.#x;
    }

    set y(value) {
        checkNegativeValueOrThrow(value, "CircleShape y");
        this.#y = value;
    }

    get y() {
        return this.#y;
    }

    set radius(value) {
        checkNegativeValueOrThrow(value, "CircleShape radius");
        this.#radius = value;
    }

    get radius() {
        return this.#radius;
    }

    resize(type, mouseStartPosition, mousePosition) {
        let posType = type === resizeType.right ? "x" : "y";
        let diff = mousePosition[posType] - mouseStartPosition[posType];
        this.radius = (this.radius * 2 + diff) / 2;
    }

    getBounds() {
        let x, y, width, height;
        x = this.x - this.radius;
        y = this.y - this.radius;
        width = height = this.radius * 2;
        return { x, y, width, height };
    }
}

export default CircleShape;
