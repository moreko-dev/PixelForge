class BoundingBox {
    #x;
    #y;
    #width;
    #height;

    constructor(options = {}) {
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.width = options.width || 0;
        this.height = options.height || 0;
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

    update(options) {
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.width = options.width || 0;
        this.height = options.height || 0;
    }
}

export default BoundingBox;
