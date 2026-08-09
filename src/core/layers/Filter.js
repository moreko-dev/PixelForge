class Filter {
    constructor(filters = {}) {
        this.grayscale = filters.grayscale || 0;
        this.brightness = filters.brightness || 100;
        this.contrast = filters.contrast || 100;
        this.blur = filters.blur || 0;
        this["hue-rotate"] = filters.hueRotate || 0;
        this.saturate = filters.saturate || 100;
        this.sepia = filters.sepia || 0;
        this.opacity = filters.opacity || 100;
    }

    set grayscale(value) {
        if (value < 0) {
            throw new Error("Filter grayscale cannot be negative");
        }
        this.#grayscale = value;
    }

    get grayscale() {
        return this.#grayscale;
    }

    set brightness(value) {
        if (value < 0) {
            throw new Error("Filter brightness cannot be negative");
        }
        this.#brightness = value;
    }

    get brightness() {
        return this.#brightness;
    }

    set contrast(value) {
        if (value < 0) {
            throw new Error("Filter contrast cannot be negative");
        }
        this.#contrast = value;
    }

    get contrast() {
        return this.#contrast;
    }

    set blur(value) {
        if (value < 0) {
            throw new Error("Filter blur cannot be negative");
        }
        this.#blur = value;
    }

    get blur() {
        return this.#blur;
    }

    set ["hue-rotate"](value) {
        if (value < 0) {
            throw new Error("Filter hueRotate cannot be negative");
        }
        this["#hue-rotate"] = value;
    }

    get ["hue-rotate"]() {
        return this["#hue-rotate"];
    }

    set saturate(value) {
        if (value < 0) {
            throw new Error("Filter saturate cannot be negative");
        }
        this.#saturate = value;
    }

    get saturate() {
        return this.#saturate;
    }

    set sepia(value) {
        if (value < 0) {
            throw new Error("Filter sepia cannot be negative");
        }
        this.#sepia = value;
    }

    get sepia() {
        return this.#sepia;
    }

    set opacity(value) {
        if (value < 0) {
            throw new Error("Filter opacity cannot be negative");
        }
        this.#opacity = value;
    }

    get opacity() {
        return this.#opacity;
    }
}

export default Filter;
