import { resizeType } from "../CoreConstants";
import ShapeLayer from "./ShapeLayer";

class CircleShape extends ShapeLayer {
    #type;
    #x;
    #y;
    #radius;

    constructor(options = {}) {
        super(
            options.id,
            options.name,
            options.visible,
            options.locked,
            options.shadow,
            options.filter,
        );
        this.#type = "circle";
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.radius = options.radius || 0;
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
}

export default CircleShape;
