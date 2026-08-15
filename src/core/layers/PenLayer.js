import {
    defaultLineCap,
    defaultLineJoin,
    layerType,
} from "../CoreConstants.js";
import {
    checkInstanceOfOrThrow,
    checkNegativeValueOrThrow,
    checkValidStringOrThrow,
} from "../CoreValidation.js";

class PenLayer extends Layer {
    #type;
    #strokeStyle;
    #lineWidth;
    #lineCap;
    #lineJoin;
    #miterLimit;
    #points;

    constructor(options = {}) {
        super(
            options.id,
            options.name,
            options.visible,
            options.locked,
            options.shadow,
            options.filter,
        );
        super.boundingBox = null;
        this.#type = layerType.PEN_LAYER;
        this.#points = [];
        this.strokeStyle = options.strokeStyle || "#000000";
        this.lineWidth = options.lineWidth || 1;
        this.lineCap = options.lineCap || defaultLineCap.butt;
        this.lineJoin = options.lineJoin || defaultLineJoin.miter;
        this.miterLimit = options.miterLimit || 10;
    }

    get type() {
        return this.#type;
    }

    set strokeStyle(value) {
        checkValidStringOrThrow(value, "PenLayer stroke-style");
        this.#strokeStyle = value;
    }

    get strokeStyle() {
        return this.#strokeStyle;
    }

    set lineWidth(value) {
        checkNegativeValueOrThrow(value, "PenLayer line-width");
        this.#lineWidth = value;
    }

    get lineWidth() {
        return this.#lineWidth;
    }

    set lineCap(value) {
        checkValidStringOrThrow(value, "PenLayer line-cap");
        this.#lineCap = value;
    }

    get lineCap() {
        return this.#lineCap;
    }

    set lineJoin(value) {
        checkValidStringOrThrow(value, "PenLayer line-join");
        this.#lineJoin = value;
    }

    get lineJoin() {
        return this.#lineJoin;
    }

    set miterLimit(value) {
        checkNegativeValueOrThrow(value, "PenLayer mitter-limit");
        this.#miterLimit = value;
    }

    get miterLimit() {
        return this.#miterLimit;
    }

    set points(value) {
        checkInstanceOfOrThrow(value, Array, "PenLayer points");
        this.#points = value;
    }

    get points() {
        return this.#points;
    }
}

export default PenLayer;
