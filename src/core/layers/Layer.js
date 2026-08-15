import { defaultFilters, defaultShadow } from "../CoreConstants.js";
import {
    checkInstanceOfOrThrow,
    checkTypeOfOrThrow,
    checkValidStringOrThrow,
} from "../CoreValidation.js";
import BoundingBox from "../selection/BoundingBox.js";
import Filter from "./Filter.js";
import Shadow from "./Shadow.js";

class Layer {
    #id;
    #name;
    #visible;
    #locked;
    #shadow;
    #filter;
    #boundingBox;

    constructor(id, name, visible, locked, shadow, filter) {
        this.id = id;
        this.name = name;
        this.visible = visible;
        this.locked = locked;
        this.shadow =
            shadow ||
            new Shadow(
                defaultShadow.color,
                defaultShadow.blur,
                defaultShadow.offsetX,
                defaultShadow.offsetY,
            );
        this.filter = filter || new Filter(defaultFilters);
        this.boundingBox = new BoundingBox({
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        });
    }

    set boundingBox(value) {
        checkInstanceOfOrThrow(value, BoundingBox, "Layer boundingBox");
        this.#boundingBox = value;
    }

    get boundingBox() {
        return this.#boundingBox;
    }

    set id(value) {
        checkValidStringOrThrow(value, "Layer id");
        this.#id = value;
    }

    get id() {
        return this.#id;
    }

    set name(value) {
        checkValidStringOrThrow(value, "Layer name");
        this.#name = value;
    }

    get name() {
        return this.#name;
    }

    set visible(value) {
        checkTypeOfOrThrow(value, "boolean", "Layer visibility");
        this.#visible = value;
    }

    get visible() {
        return this.#visible;
    }

    set locked(value) {
        checkTypeOfOrThrow(value, "boolean", "Layer locked");
        this.#locked = value;
    }

    get locked() {
        return this.#locked;
    }

    set shadow(value) {
        checkInstanceOfOrThrow(value, Shadow, "Layer shadow");
        this.#shadow = value;
    }

    get shadow() {
        return this.#shadow;
    }

    set filter(value) {
        checkInstanceOfOrThrow(value, Filter, "Layer filter");
        this.#filter = value;
    }

    get filter() {
        return this.#filter;
    }

    move(mouseStartPosition, mousePosition) {
        let deltaX = mousePosition.x - mouseStartPosition.x;
        let deltaY = mousePosition.y - mouseStartPosition.y;
        this.x += deltaX;
        this.y += deltaY;
    }

    resize(type, mouseStartPosition, mousePosition) {
        let posType = type === resizeType.right ? "x" : "y";
        let dimenType = type === resizeType.right ? "width" : "height";
        let diff = mousePosition[posType] - mouseStartPosition[posType];
        this[dimenType] += diff;
    }

    getBounds(canvasRef) {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
        };
    }
}

export default Layer;
