class Shadow {
    #color;
    #blur;
    #offsetX;
    #offsetY;

    constructor(color, blur, offsetX, offsetY) {
        this.color = color;
        this.blur = blur;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }

    set color(value) {
        if (!String(value).trim()) {
            throw new Error(`Shadow color is not valid -> [${value}]`);
        }
        this.#color = value;
    }

    get color() {
        return this.#color;
    }

    set blur(value) {
        if (value < 0) {
            throw new Error("Shadow blur cannot be negative");
        }
        this.#blur = value;
    }

    get blur() {
        return this.#blur;
    }

    set offsetX(value) {
        if (value < 0) {
            throw new Error("Shadow offsetX cannot be negative");
        }
        this.#offsetX = value;
    }

    get offsetX() {
        return this.#offsetX;
    }

    set offsetY(value) {
        if (value < 0) {
            throw new Error("Shadow offsetY cannot be negative");
        }
        this.#offsetY = value;
    }
}
