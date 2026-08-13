import { defaultFonts, resizeType } from "../CoreConstants.js";
import Layer from "./Layer.js";

class TextLayer extends Layer {
    #value;
    #x;
    #y;
    #width;
    #height;
    #fontSize;
    #fontFamily;
    #fillStyle;

    constructor(options = {}) {
        super(
            options.id,
            options.name,
            options.visible,
            options.locked,
            options.shadow,
            options.filter,
        );
        this.#type = "text";
        this.value = options.value || "";
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.width = options.width || 0;
        this.height = options.height || 0;
        this.fontSize = options.fontSize || 12;
        this.fontFamily = options.fontFamily || defaultFonts[0];
        this.fillStyle = options.fillStyle || "#000000";
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
        this.#fillStyle = value;
    }

    get fillStyle() {
        return this.#fillStyle;
    }

    resize(type, mouseStartPosition, mousePosition) {
        let posType = type === resizeType.right ? "x" : "y";
        let dimenType = type === resizeType.right ? "width" : "height";
        let scale = this.fontSize / this[dimenType];
        let diff = mousePosition[posType] - mouseStartPosition[posType];
        let resizedValue = (this[dimenType] + diff) * scale;
        this.fontSize = resizedValue;
    }

    updateDimensions(canvasRef) {
        const context = canvasRef.getContext("2d");
        context.font = `${this.fontSize}px ${this.fontFamily}`;
        const { width, actualBoundingBoxAscent, actualBoundingBoxDescent } =
            context.measureText(this.value);
        let updatedDimension = {
            width: width,
            height:
                actualBoundingBoxAscent && actualBoundingBoxDescent
                    ? actualBoundingBoxAscent + actualBoundingBoxDescent
                    : this.fontSize * 1.2,
        };
        this.width = updatedDimension.width;
        this.height = updatedDimension.height;
    }
}

export default TextLayer;
