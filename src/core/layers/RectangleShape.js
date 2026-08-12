import ShapeLayer from "./ShapeLayer";

class RectangleShape extends ShapeLayer {
    #type;
    #x;
    #y;
    #width;
    #height;

    constructor(options = {}) {
        super(
            options.id,
            options.name,
            options.visible,
            options.locked,
            options.shadow,
            options.filter,
        );
        this.#type = "rect";
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.width = options.width || 0;
        this.height = options.height || 0;
    }

    get type() {
        return this.#type;
    }

    set x(value) {
        if (value < 0) {
            throw new Error("Rectangle x cannot be negative");
        }
        this.#x = value;
    }

    get x() {
        return this.#x;
    }

    set y(value) {
        if (value < 0) {
            throw new Error("Rectangle y cannot be negative");
        }
        this.#y = value;
    }

    get y() {
        return this.#y;
    }

    set width(value) {
        if (value < 0) {
            throw new Error("Rectangle width cannot be negative");
        }
        this.#width = value;
    }

    get width() {
        return this.#width;
    }

    set height(value) {
        if (value < 0) {
            throw new Error("Rectangle height cannot be negative");
        }
        this.#height = value;
    }

    get height() {
        return this.#height;
    }
}

export default RectangleShape;
