class Layer {
    constructor(id, name, visible, locked) {
        this.id = id;
        this.name = name;
        this.visible = visible;
        this.locked = locked;
    }

    set id(value) {
        if (!String(value).trim()) {
            throw new Error(`Layer ID is not valid -> [${value}]`);
        }
        this._id = value;
    }

    get id() {
        return this._id;
    }

    set name(value) {
        if (!String(value).trim()) {
            throw new Error(`Layer name is not valid -> [${value}]`);
        }
        this._name = value;
    }

    get name() {
        return this._name;
    }

    set visible(value) {
        if (typeof value !== "boolean") {
            throw new Error("Layer visibility should have a boolean value");
        }
        this._visible = value;
    }

    get visible() {
        return this._visible;
    }

    set locked(value) {
        if (typeof value !== "boolean") {
            throw new Error("Layer locked should have a boolean value");
        }
        this._locked = value;
    }

    get locked() {
        return this._locked;
    }

    move() {}

    resize() {}

    rotate() {}

    clone() {}
}

export default Layer;
