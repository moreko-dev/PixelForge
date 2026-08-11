import { defaultFilters, defaultShadow } from "../CoreConstants";
import Filter from "./Filter";
import Shadow from "./Shadow";

class Layer {
    #id;
    #name;
    #visible;
    #locked;
    #shadow;
    #filter;

    constructor(id, name, visible, locked, shadow, filter) {
        if (!id) throw new Error("Layer id cannot be undefined");
        if (!name) throw new Error("Layer name cannot be undefined");
        if (!visible) throw new Error("Layer visible cannot be undefined");
        if (!locked) throw new Error("Layer locked cannot be undefined");

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
    }

    set id(value) {
        if (!String(value).trim()) {
            throw new Error(`Layer ID is not valid -> [${value}]`);
        }
        this.#id = value;
    }

    get id() {
        return this.#id;
    }

    set name(value) {
        if (!String(value).trim()) {
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

    move(mouseStartPosition, mousePosition, elementPosition) {
        let deltaX = mousePosition.x - mouseStartPosition.x;
        let deltaY = mousePosition.y - mouseStartPosition.y;
        let draggedPosition = {
            x: deltaX + elementPosition.x,
            y: deltaY + elementPosition.y,
        };
        this.x = draggedPosition.x;
        this.y = draggedPosition.y;
    }

    resize(type, mouseStartPosition, mousePosition, elementDimension) {
        let posType = type === resizeType.right ? "x" : "y";
        let dimenType = type === resizeType.right ? "w" : "h";
        let diff = mousePosition[posType] - mouseStartPosition[posType];
        let resizedDimension = elementDimension[dimenType] + diff;
        this[posType] = resizedDimension;
    }
}

export default Layer;
