import { resizeType } from "../CoreConstants.js";
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
        this.#shapeType = "circle";
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.radius = options.radius || 0;
    }

    get shapeType() {
        return this.#shapeType;
    }

    set x(value) {
        if (value < 0) {
            throw new Error("Circle x cannot be negative");
        }
        this.#x = value;
    }

    get x() {
        return this.#x;
    }

    set y(value) {
        if (value < 0) {
            throw new Error("Circle y cannot be negative");
        }
        this.#y = value;
    }

    get y() {
        return this.#y;
    }

    set radius(value) {
        if (value < 0) {
            throw new Error("Circle radius cannot be negative");
        }
        this.#radius = value;
    }

    get radius() {
        return this.#radius;
    }

    resize(type, mouseStartPosition, mousePosition) {
        let posType = type === resizeType.right ? "x" : "y";
        let diff = mousePosition[posType] - mouseStartPosition[posType];
        let resizedDimension = this.radius * 2 + diff;
        this.radius = resizedDimension / 2;
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
