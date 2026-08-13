import { defaultFilters, defaultShadow } from "../CoreConstants";
import BoundingBox from "../selection/BoundingBox";
import Filter from "./Filter";
import Shadow from "./Shadow";

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
        this.#boundingBox = new BoundingBox({
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        });
    }

    set boundingBox(value) {
        if (!(value instanceof BoundingBox)) {
            throw new Error(
                `Layer boundingBox is not a valid object -> [${value}]`,
            );
        }
        this.#boundingBox = value;
    }

    get boundingBox() {
        return this.#boundingBox;
    }

    set id(value) {
        if (!id || !String(value).trim()) {
            throw new Error(`Layer ID is not valid -> [${value}]`);
        }
        this.#id = value;
    }

    get id() {
        return this.#id;
    }

    set name(value) {
        if (!name || !String(value).trim()) {
            throw new Error(`Layer name is not valid -> [${value}]`);
        }
        this.#name = value;
    }

    get name() {
        return this.#name;
    }

    set visible(value) {
        if (typeof value !== "boolean") {
            throw new Error("Layer visibility should have a boolean value");
        }
        this.#visible = value;
    }

    get visible() {
        return this.#visible;
    }

    set locked(value) {
        if (typeof value !== "boolean") {
            throw new Error("Layer locked should have a boolean value");
        }
        this.#locked = value;
    }

    get locked() {
        return this.#locked;
    }

    set shadow(value) {
        if (!(value instanceof Shadow)) {
            throw new Error(`Layer shadow is not valid object -> [${value}]`);
        }
        this.#shadow = value;
    }

    get shadow() {
        return this.#shadow;
    }

    set filter(value) {
        if (!(value instanceof Filter)) {
            throw new Error(`Layer filter is not valid object -> [${value}]`);
        }
        this.#filter = value;
    }

    get filter() {
        return this.#filter;
    }

    move(mouseStartPosition, mousePosition) {
        let deltaX = mousePosition.x - mouseStartPosition.x;
        let deltaY = mousePosition.y - mouseStartPosition.y;
        let draggedPosition = {
            x: deltaX + this.x,
            y: deltaY + this.y,
        };
        this.x = draggedPosition.x;
        this.y = draggedPosition.y;
    }

    resize(type, mouseStartPosition, mousePosition) {
        let posType = type === resizeType.right ? "x" : "y";
        let dimenType = type === resizeType.right ? "width" : "height";
        let diff = mousePosition[posType] - mouseStartPosition[posType];
        let resizedDimension = this[dimenType] + diff;
        this[dimenType] = resizedDimension;
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
