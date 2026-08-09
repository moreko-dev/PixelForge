class Circle extends Shape {
    #type;
    #x;
    #y;
    #radius;

    constructor(id, name, visible, locked) {
        super(id, name, visible, locked);
        this.#type = "circle";
        this.x = 0;
        this.y = 0;
        this.radius = 0;
    }

    set x(value) {
        if (value < 0) {
            throw new Error("Circle x cannot be negative");
        }
        this.#x = value;
    }

    get x() {
        return this.#x;
    }

    set y(value) {
        if (value < 0) {
            throw new Error("Circle y cannot be negative");
        }
        this.#y = value;
    }

    get y() {
        return this.#y;
    }

    set radius(value) {
        if (value < 0) {
            throw new Error("Circle radius cannot be negative");
        }
        this.#radius = value;
    }

    get radius() {
        return this.#radius;
    }
}

export default Circle;
