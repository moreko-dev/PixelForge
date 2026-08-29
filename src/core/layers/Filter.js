import { checkNegativeValueOrThrow } from "../CoreValidation.js";

class Filter {
    #grayscale;
    #brightness;
    #contrast;
    #blur;
    ["#hue-rotate"];
    #saturate;
    #sepia;
    #opacity;

    constructor(filters = {}) {
        this.setFilters(filters);
    }

    set grayscale(value) {
        checkNegativeValueOrThrow(value, "Filter grayscale");
        this.#grayscale = value;
    }

    get grayscale() {
        return this.#grayscale;
    }

    set brightness(value) {
        checkNegativeValueOrThrow(value, "Filter brightness");
        this.#brightness = value;
    }

    get brightness() {
        return this.#brightness;
    }

    set contrast(value) {
        checkNegativeValueOrThrow(value, "Filter contrast");
        this.#contrast = value;
    }

    get contrast() {
        return this.#contrast;
    }

    set blur(value) {
        checkNegativeValueOrThrow(value, "Filter blur");
        this.#blur = value;
    }

    get blur() {
        return this.#blur;
    }

    set ["hue-rotate"](value) {
        checkNegativeValueOrThrow(value, "Filter hue-rotate");
        this["#hue-rotate"] = value;
    }

    get ["hue-rotate"]() {
        return this["#hue-rotate"];
    }

    set saturate(value) {
        checkNegativeValueOrThrow(value, "Filter saturate");
        this.#saturate = value;
    }

    get saturate() {
        return this.#saturate;
    }

    set sepia(value) {
        checkNegativeValueOrThrow(value, "Filter sepia");
        this.#sepia = value;
    }

    get sepia() {
        return this.#sepia;
    }

    set opacity(value) {
        checkNegativeValueOrThrow(value, "Filter opacity");
        this.#opacity = value;
    }

    get opacity() {
        return this.#opacity;
    }

    reset() {
        this.grayscale = 0;
        this.brightness = 100;
        this.contrast = 100;
        this.blur = 0;
        this["hue-rotate"] = 0;
        this.saturate = 100;
        this.sepia = 0;
        this.opacity = 100;
    }

    setFilters(filters = {}) {
        this.#grayscale = filters.grayscale || 0;
        this.#brightness = filters.brightness || 100;
        this.#contrast = filters.contrast || 100;
        this.#blur = filters.blur || 0;
        this["#hue-rotate"] = filters.hueRotate || 0;
        this.#saturate = filters.saturate || 100;
        this.#sepia = filters.sepia || 0;
        this.#opacity = filters.opacity || 100;
    }

    getFilters() {
        return {
            grayscale: this.grayscale,
            brightness: this.brightness,
            contrast: this.contrast,
            blur: this.blur,
            ["hue-rotate"]: this["hue-rotate"],
            saturate: this.saturate,
            sepia: this.sepia,
            opacity: this.opacity,
        };
    }
}

export default Filter;
