import Layer from "./Layer.js";

class ShapeLayer extends Layer {
    #type;
    #strokeStyle;
    #fillStyle;
    #lineWidth;

    constructor(options = {}) {
        super(
            options.id,
            options.name,
            options.visible,
            options.locked,
            options.shadow,
            options.filter,
        );
        this.#type = "shape";
        this.strokeStyle = options.strokeStyle || "#000000";
        this.fillStyle = options.fillStyle || "#ffffff";
        this.lineWidth = options.lineWidth || 1;
    }

    get type() {
        return this.#type;
    }

    set strokeStyle(value) {
        if (!String(value).trim()) {
            throw new Error(
                `ShapeLayer strokeStyle is not valid -> [${value}]`,
            );
        }
        this.#strokeStyle = value;
    }

    get strokeStyle() {
        return this.#strokeStyle;
    }

    set fillStyle(value) {
        if (!String(value).trim()) {
            throw new Error(`ShapeLayer fillStyle is not valid -> [${value}]`);
        }
        this.#fillStyle = value;
    }

    get fillStyle() {
        return this.#fillStyle;
    }

    set lineWidth(value) {
        if (value < 0) {
            throw new Error("ShapeLayer lineWidth cannot be negative");
        }
        this.#lineWidth = value;
    }

    get lineWidth() {
        return this.#lineWidth;
    }
}

export default ShapeLayer;
