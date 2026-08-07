class PenLayer extends Layer {
    #type;
    #strokeStyle;
    #lineWidth;
    #lineCap;
    #lineJoin;
    #miterLimit;
    #points;

    constructor(id, name, visible, locked) {
        super(id, name, visible, locked);
        this.#type = "pen";
        this.#points = [];
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

    get points() {
        return this.#points;
    }

    addPoint(x, y) {}
}
