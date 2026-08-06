import ImageFilter from "./ImageFilter";
import Layer from "./Layer";

class ImageLayer extends Layer {
    constructor(id, name, visible, locked) {
        super(id, name, visible, locked);
        this._type = "image";
    }

    set x(value) {
        if (value < 0) {
            throw new Error("ImageLayer x property cannot be negative");
        }
        this._x = value;
    }

    get x() {
        return this._x;
    }

    set y(value) {
        if (value < 0) {
            throw new Error("ImageLayer y property cannot be negative");
        }
        this._y = value;
    }

    get y() {
        return this._y;
    }

    set width(value) {
        if (value < 0) {
            throw new Error("ImageLayer width cannot be negative");
        }
        this._width = value;
    }

    get width() {
        return this._width;
    }

    set height(value) {
        if (value < 0) {
            throw new Error("ImageLayer height cannot be negative");
        }
        this._height = value;
    }

    get height() {
        return this._height;
    }

    set image(value) {
        if (!value || (!value) instanceof Image) {
            throw new Error(`ImageLayer image is not valid -> [${value}]`);
        }
        this._image = value;
    }

    get image() {
        return this._image;
    }

    set src(value) {
        if (!String(src).trim()) {
            throw new Error(`ImageLayer src is not valid -> [${value}]`);
        }
        this._src = value;
    }

    get src() {
        return this._src;
    }

    set filter(value) {
        if ((!value) instanceof ImageFilter) {
            throw new Error(
                `ImageLayer filter is not valid object -> [${value}]`,
            );
        }
        this._filter = value;
    }

    get filter() {
        return this._filter;
    }

    set rotate(value) {
        if (value < 0) {
            throw new Error("ImageLayer rotate cannot be negative");
        }
        this._rotate = value;
    }

    get rotate() {
        this._rotate;
    }

    set flipX(value) {
        if (typeof value !== "boolean") {
            throw new Error("ImageLayer flipX should have a boolean value");
        }
        this._flipX = value;
    }

    get flipX() {
        return this._flipX;
    }

    set flipY(value) {
        if (typeof value !== "boolean") {
            throw new Error("ImageLayer flipY should have a boolean value");
        }
        this._flipY = value;
    }

    get flipY() {
        return this._flipY;
    }
}

export default ImageLayer;
