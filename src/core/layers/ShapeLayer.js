import { layerType } from "../CoreConstants.js";
import {
    checkNegativeValueOrThrow,
    checkValidStringOrThrow,
} from "../CoreValidation.js";
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
        this.#type = layerType.SHAPE_LAYER;
        this.strokeStyle = options.strokeStyle || "#000000";
        this.fillStyle = options.fillStyle || "#ffffff";
        this.lineWidth = options.lineWidth || 1;
    }

    get type() {
        return this.#type;
    }

    set strokeStyle(value) {
        checkValidStringOrThrow(value, "ShapeLayer stroke-style");
        this.#strokeStyle = value;
    }

    get strokeStyle() {
        return this.#strokeStyle;
    }

    set fillStyle(value) {
        checkValidStringOrThrow(value, "ShapeLayer fill-style");
        this.#fillStyle = value;
    }

    get fillStyle() {
        return this.#fillStyle;
    }

    set lineWidth(value) {
        checkNegativeValueOrThrow(value, "ShapeLayer line-width");
        this.#lineWidth = value;
    }

    get lineWidth() {
        return this.#lineWidth;
    }
}

export default ShapeLayer;
