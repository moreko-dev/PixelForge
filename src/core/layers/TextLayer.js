import Layer from "./Layer";

class TextLayer extends Layer {
    #value;
    #x;
    #y;
    #width;
    #height;
    #fontSize;
    #fontFamily;
    #fillStyle;

    constructor(id, name, visible, locked) {
        super(id, name, visible, locked);
        this.#type = "text";
        this.value = "";
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.fontSize = 12;
        this.fontFamily = ""; // Need constant or enum
        this.fillStyle = "#000000";
    }

    set value(value) {
        this.#value = value;
    }

    get value() {
        return this.#value;
    }

    set x(value) {
        if (value < 0) {
            throw new Error("TextLayer x cannot be negative");
        }
        this.#x = value;
    }

    get x() {
        return this.#x;
    }

    set y(value) {
        if (value < 0) {
            throw new Error("TextLayer y cannot be negative");
        }
        this.#y = value;
    }

    get y() {
        return this.#y;
    }

    set width(value) {
        if (value < 0) {
            throw new Error("TextLayer width cannot be negative");
        }
        this.#width = value;
    }

    get width() {
        return this.#width;
    }

    set height(value) {
        if (value < 0) {
            throw new Error("TextLayer height cannot be negative");
        }
        this.#height = value;
    }

    get height() {
        return this.#height;
    }

    set fontSize(value) {
        if (value < 0) {
            throw new Error("TextLayer fontSize cannot be negative");
        }
        this.#fontSize = value;
    }

    get fontSize() {
        return this.#fontSize;
    }

    set fontFamily(value) {
        if (!String(value).trim()) {
            throw new Error(`TextLayer fontFamily is not valid -> [${value}]`);
        }
        this.#fontFamily = value;
    }

    get fontFamily() {
        return this.#fontFamily;
    }

    set fillStyle(value) {
        if (!String(value).trim()) {
            throw new Error(`TextLayer fontStyle is not valid -> [${value}]`);
        }
    }

    get fillStyle() {
        return this.#fillStyle;
    }
}

export default TextLayer;
