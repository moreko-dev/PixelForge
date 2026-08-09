class BoundingBox {
    #x;
    #y;
    #width;
    #height;

    constructor(x = 0, y = 0, width = 0, height = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    set x(value) {
        if (value < 0) {
            throw new Error("BoundingBox x cannot be negative");
        }
        this.#x = value;
    }

    get x() {
        return this.#x;
    }

    set y(value) {
        if (value < 0) {
            throw new Error("BoundingBox y cannot be negative");
        }
        this.#y = value;
    }

    get y() {
        return this.#y;
    }

    set width(value) {
        if (value < 0) {
            throw new Error("BoundingBox width cannot be negative");
        }
        this.#width = value;
    }

    get width() {
        return this.#width;
    }

    set height(value) {
        if (value < 0) {
            throw new Error("BoundingBox height cannot be negative");
        }
        this.#height = value;
    }

    get height() {
        return this.#height;
    }

    updateBounds() {}
}

export default BoundingBox;
