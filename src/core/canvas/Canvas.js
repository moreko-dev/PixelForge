class Canvas {
    constructor(width, height, bgColor) {
        this.width = width;
        this.height = height;
        this.backgroundColor = bgColor;
    }

    set width(value) {
        if (value < 0) {
            throw new Error("Canvas width cannot be negative");
        }
        this._width = value;
    }

    get width() {
        return this._width;
    }

    set height(value) {
        if (value < 0) {
            throw new Error("Canvas height cannot be negative");
        }
        this._height = value;
    }

    get height() {
        return this._height;
    }

    set backgroundColor(value) {
        if (!String(value).trim()) {
            throw new Error(
                `Canvas bgColor should have a valid value -> [${value}]`,
            );
        }
        this._backgroundColor = value;
    }

    get backgroundColor() {
        return this._backgroundColor;
    }

    resize() {}
}

export default Canvas;
