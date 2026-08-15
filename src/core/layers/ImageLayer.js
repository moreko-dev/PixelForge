import { layerType } from "../CoreConstants.js";
import {
    checkInstanceOfOrThrow,
    checkNegativeValueOrThrow,
    checkTypeOfOrThrow,
    checkValidStringOrThrow,
} from "../CoreValidation.js";
import Layer from "./Layer.js";

class ImageLayer extends Layer {
    #type;
    #x;
    #y;
    #width;
    #height;
    #image;
    #src;
    #rotate;
    #flipX;
    #flipY;

    constructor(options = {}) {
        super(
            options.id,
            options.name,
            options.visible,
            options.locked,
            options.shadow,
            options.filter,
        );
        this.#type = layerType.IMAGE_LAYER;
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.width = options.width || 0;
        this.height = options.height || 0;
        this.image = options.image || null;
        this.src = options.src || null;
        this.rotate = options.rotate || 0;
        this.flipX = options.flipX || false;
        this.flipY = options.flipY || false;
    }

    get type() {
        return this.#type;
    }

    set x(value) {
        checkNegativeValueOrThrow(value, "ImageLayer x");
        this.#x = value;
    }

    get x() {
        return this.#x;
    }

    set y(value) {
        checkNegativeValueOrThrow(value, "ImageLayer y");
        this.#y = value;
    }

    get y() {
        return this.#y;
    }

    set width(value) {
        checkNegativeValueOrThrow(value, "ImageLayer width");
        this.#width = value;
    }

    get width() {
        return this.#width;
    }

    set height(value) {
        checkNegativeValueOrThrow(value, "ImageLayer height");
        this.#height = value;
    }

    get height() {
        return this.#height;
    }

    set image(value) {
        checkInstanceOfOrThrow(value, Image, "ImageLayer image");
        this.#image = value;
    }

    get image() {
        return this.#image;
    }

    set src(value) {
        checkValidStringOrThrow(value, "ImageLayer src");
        this.#src = value;
    }

    get src() {
        return this.#src;
    }

    set rotate(value) {
        checkTypeOfOrThrow(value, "number", "ImageLayer rotate");
        this.#rotate = value;
    }

    get rotate() {
        return this.#rotate;
    }

    set flipX(value) {
        checkTypeOfOrThrow(value, "boolean", "ImageLayer flipX");
        this.#flipX = value;
    }

    get flipX() {
        return this.#flipX;
    }

    set flipY(value) {
        checkTypeOfOrThrow(value, "boolean", "ImageLayer flipY");
        this.#flipY = value;
    }

    get flipY() {
        return this.#flipY;
    }
}

export default ImageLayer;
