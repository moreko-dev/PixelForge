import { defaultLineCap, defaultLineJoin } from "../CoreConstants";

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
        this.#type = "pen";
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
        if (!String(value).trim()) {
            throw new Error(`PenLayer strokeStyle is not valid -> [${value}`);
        }
        this.#strokeStyle = value;
    }

    get strokeStyle() {
        return this.#strokeStyle;
    }

    set lineWidth(value) {
        if (value < 0) {
            throw new Error("PenLayer lineWidth cannot be negative");
        }
        this.#lineWidth = value;
    }

    get lineWidth() {
        return this.#lineWidth;
    }

    set lineCap(value) {
        if (!String(value).trim()) {
            throw new Error(`PenLayer lineCap is not valid -> [${value}]`);
        }
        this.#lineCap = value;
    }

    get lineCap() {
        return this.#lineCap;
    }

    set lineJoin(value) {
        if (!String(value).trim()) {
            throw new Error(`PenLayer lineJoin is not valid -> [${value}]`);
        }
        this.#lineJoin = value;
    }

    get lineJoin() {
        return this.#lineJoin;
    }

    set miterLimit(value) {
        if (value < 0) {
            throw new Error("PenLayer miterLimit cannot be negative");
        }
        this.#miterLimit = value;
    }

    get miterLimit() {
        return this.#miterLimit;
    }

    set points(value) {
        if (!Array.isArray(value)) {
            throw new Error(`PenTool points is not valid object -> [${value}]`);
        }
        this.#points = value;
    }

    get points() {
        return this.#points;
    }
}

export default PenLayer;
