import { defaultFonts, layerType, resizeType } from "../CoreConstants.js";
import {
    checkNegativeValueOrThrow,
    checkValidStringOrThrow,
} from "../CoreValidation.js";
import Layer from "./Layer.js";

class TextLayer extends Layer {
    #type;
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
        this.#type = layerType.TEXT_LAYER;
        this.value = options.value || "";
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.width = options.width || 0;
        this.height = options.height || 0;
        this.fontSize = options.fontSize || 12;
        this.fontFamily = options.fontFamily || defaultFonts[0];
        this.fillStyle = options.fillStyle || "#000000";
    }

    get type() {
        return this.#type;
    }

    set value(value) {
        this.#value = value;
    }

    get value() {
        return this.#value;
    }

    set x(value) {
        checkNegativeValueOrThrow(value, "TextLayer x");
        this.#x = value;
    }

    get x() {
        return this.#x;
    }

    set y(value) {
        checkNegativeValueOrThrow(value, "TextLayer y");
        this.#y = value;
    }

    get y() {
        return this.#y;
    }

    set width(value) {
        checkNegativeValueOrThrow(value, "TextLayer width");
        this.#width = value;
    }

    get width() {
        return this.#width;
    }

    set height(value) {
        checkNegativeValueOrThrow(value, "TextLayer height");
        this.#height = value;
    }

    get height() {
        return this.#height;
    }

    set fontSize(value) {
        checkNegativeValueOrThrow(value, "TextLayer font-size");
        this.#fontSize = value;
    }

    get fontSize() {
        return this.#fontSize;
    }

    set fontFamily(value) {
        checkValidStringOrThrow(value, "TextLayer font-family");
        this.#fontFamily = value;
    }

    get fontFamily() {
        return this.#fontFamily;
    }

    set fillStyle(value) {
        checkValidStringOrThrow(value, "TextLayer fill-style");
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
        this.fontSize = (this[dimenType] + diff) * scale;
    }

    updateDimensions(canvasRef) {
        const context = canvasRef.getContext("2d");
        context.font = `${this.fontSize}px ${this.fontFamily}`;
        const { width, actualBoundingBoxAscent, actualBoundingBoxDescent } =
            context.measureText(this.value);
        this.width = width;
        this.height =
            actualBoundingBoxAscent && actualBoundingBoxDescent
                ? actualBoundingBoxAscent + actualBoundingBoxDescent
                : this.fontSize * 1.2;
    }
}

export default TextLayer;
