class Shadow {
    #color;
    #blur;
    #offsetX;
    #offsetY;

    constructor(color, blur, offsetX, offsetY) {
        this.color = color || "#000000";
        this.blur = blur || 0;
        this.offsetX = offsetX || 0;
        this.offsetY = offsetY || 0;
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

    reset() {
        this.color = "#000000";
        this.blur = 0;
        this.offsetX = 0;
        this.offsetY = 0;
    }
}

export default Shadow;
