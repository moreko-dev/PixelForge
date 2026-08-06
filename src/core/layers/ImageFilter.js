class ImageFilter {
    constructor(
        grayscale,
        brightness,
        contrast,
        blur,
        hueRotate,
        saturate,
        sepia,
        opacity,
    ) {
        this.grayscale = grayscale;
        this.brightness = brightness;
        this.contrast = contrast;
        this.blur = blur;
        this["hue-rotate"] = hueRotate;
        this.saturate = saturate;
        this.sepia = sepia;
        this.opacity = opacity;
    }

    set grayscale(value) {
        if (value < 0) {
            throw new Error("Filter grayscale cannot be negative");
        }
        this._grayscale = value;
    }

    get grayscale() {
        return this._grayscale;
    }

    set brightness(value) {
        if (value < 0) {
            throw new Error("Filter brightness cannot be negative");
        }
        this._brightness = value;
    }

    get brightness() {
        return this._brightness;
    }

    set contrast(value) {
        if (value < 0) {
            throw new Error("Filter contrast cannot be negative");
        }
        this._contrast = value;
    }

    get contrast() {
        return this._contrast;
    }

    set blur(value) {
        if (value < 0) {
            throw new Error("Filter blur cannot be negative");
        }
        this._blur = value;
    }

    get blur() {
        return this._blur;
    }

    set ["hue-rotate"](value) {
        if (value < 0) {
            throw new Error("Filter hueRotate cannot be negative");
        }
        this["_hue-rotate"] = value;
    }

    get ["hue-rotate"]() {
        return this["_hue-rotate"];
    }

    set saturate(value) {
        if (value < 0) {
            throw new Error("Filter saturate cannot be negative");
        }
        this._saturate = value;
    }

    get saturate() {
        return this._saturate;
    }

    set sepia(value) {
        if (value < 0) {
            throw new Error("Filter sepia cannot be negative");
        }
        this._sepia = value;
    }

    get sepia() {
        return this._sepia;
    }

    set opacity(value) {
        if (value < 0) {
            throw new Error("Filter opacity cannot be negative");
        }
        this._opacity = value;
    }

    get opacity() {
        return this._opacity;
    }
}

export default ImageFilter;
