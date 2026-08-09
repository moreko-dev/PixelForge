import Layer from "./Layer";

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

    constructor(id, name, visible, locked) {
        super(id, name, visible, locked);
        this.#type = "image";
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.image = null;
        this.src = "";
        this.rotate = 0;
        this.flipX = false;
        this.flipY = false;
    }

    get type() {
        return this.#type;
    }

    set x(value) {
        if (value < 0) {
            throw new Error("ImageLayer x property cannot be negative");
        }
        this.#x = value;
    }

    get x() {
        return this.#x;
    }

    set y(value) {
        if (value < 0) {
            throw new Error("ImageLayer y property cannot be negative");
        }
        this.#y = value;
    }

    get y() {
        return this.#y;
    }

    set width(value) {
        if (value < 0) {
            throw new Error("ImageLayer width cannot be negative");
        }
        this.#width = value;
    }

    get width() {
        return this.#width;
    }

    set height(value) {
        if (value < 0) {
            throw new Error("ImageLayer height cannot be negative");
        }
        this.#height = value;
    }

    get height() {
        return this.#height;
    }

    set image(value) {
        if (!value || !(value instanceof Image)) {
            throw new Error(`ImageLayer image is not valid -> [${value}]`);
        }
        this.#image = value;
    }

    get image() {
        return this.#image;
    }

    set src(value) {
        if (!String(src).trim()) {
            throw new Error(`ImageLayer src is not valid -> [${value}]`);
        }
        this.#src = value;
    }

    get src() {
        return this.#src;
    }

    set rotate(value) {
        if (value < 0) {
            throw new Error("ImageLayer rotate cannot be negative");
        }
        this.#rotate = value;
    }

    get rotate() {
        this.#rotate;
    }

    set flipX(value) {
        if (typeof value !== "boolean") {
            throw new Error("ImageLayer flipX should have a boolean value");
        }
        this.#flipX = value;
    }

    get flipX() {
        return this.#flipX;
    }

    set flipY(value) {
        if (typeof value !== "boolean") {
            throw new Error("ImageLayer flipY should have a boolean value");
        }
        this.#flipY = value;
    }

    get flipY() {
        return this.#flipY;
    }
}

export default ImageLayer;
